import React, {Component} from 'react';
import {AutoComplete} from '../Partials'
import {Roller} from '../../Loading'
import PropTypes from 'prop-types';


export default class Search extends Component {

    constructor(props) {
        super(props)
        this.state.searchQuery = props.searchValue;
    }

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        searchValue: PropTypes.string,
        count_categories: PropTypes.number,
        count_services: PropTypes.number
    }

    state = {
        searchQuery: '',
        hint: ''
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value});
    }

    componentWillMount() {
        this._setHint(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.autoCompleteWorks) {
            this.setState({searchQuery: nextProps.searchValue});
        }
        this._setHint(nextProps)
    }

    _setHint = (props) => {
        const {count_categories, count_services} = props;
        if (count_categories > -1 && count_categories) {
            this.setState(
                {hint: `Найдено категорий: ${count_categories}, услуг: ${count_services}`})
            return
        }
        this.setState({hint: ''})
    }

    _onSubmit = e => {
        e.preventDefault();
        if (this._validateSearchString()) {
            this.setState({hint: ''})
            this.props.setSearch(this.state);
        }
    }

    _validateSearchString = () => {
        if (this.state.searchQuery.trim().length < 3) {
            this.setState({hint: 'Введите более 2х символов'})
            return false
        }
        return true;
    }

    render() {
        const {props: {loading}, state: {searchQuery, hint}} = this;
        return (
            <section className="search">
                <form className="search-form" onSubmit={this._onSubmit}>
                    <AutoComplete name="searchQuery"
                                  placeholder="Поиск предприятий и услуг"
                                  value={searchQuery}
                                  onChange={this._onChange}
                                  disabled={loading}
                                  multiSection={true}
                                  {...this.props}/>
                    <div className="search-form_loader-wrap">
                        {loading && <Roller width="38px"/>}
                    </div>
                    <div className="search-form_button-wrap">
                        <button className="search-form_button-wrap_button">Найти</button>
                    </div>
                </form>
                {hint && <span className='search-form_hint'>{hint}</span>}
            </section>
        );
    }
}


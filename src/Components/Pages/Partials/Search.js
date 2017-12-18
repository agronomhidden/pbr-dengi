import React, {Component} from 'react';
import {AutoComplete} from '../Partials'
import {Roller} from '../../Loading'
import PropTypes from 'prop-types';


export default class Search extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        searchValue: PropTypes.string.isRequired,
    }

    state = {
        searchQuery: '',
    };

    onChange = ({target: {name, value}}) => {
        this.setState({[name]: value});
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.autoCompleteWorks) {
            this.setState({searchQuery: nextProps.searchValue});
        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.setSearch(this.state);
    };

    render() {
        const {props: {loading}, state: {searchQuery}} = this;
        return (
            <section className="search">
                <form className="search-form" onSubmit={this.onSubmit}>
                    <AutoComplete name="searchQuery"
                                  placeholder="Поиск предприятий и услуг"
                                  value={searchQuery}
                                  onChange={this.onChange}
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
            </section>
        );
    }
}


import React, {Component} from 'react';
import {FormGroup} from '../Partials'
import {Roller} from '../../Loading'
import PropTypes from 'prop-types';

export default class Search extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        searchValue: PropTypes.string.isRequired,
        searchFunc: PropTypes.func.isRequired
    }

    state = {
        searchQuery: '',
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentWillMount() {
        this._setSearchField(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this._setSearchField(nextProps)
    }

    _setSearchField(props) {
        this.setState({searchQuery: props.searchValue});
    }


    onSubmit = e => {
        e.preventDefault();
        this.props.searchFunc(this.state);
    };

    render() {
        const {props: {loading}, state: {searchQuery}} = this;

        return (
            <section className="search">
                <form className="search-form" onSubmit={this.onSubmit}>
                    <FormGroup name="searchQuery" placeholder="Поиск предприятий и услуг" value={searchQuery}
                               onChange={this.onChange} isNotForm={true}
                               wrapperModifier='search-form_group' inputModifier='search-form_input'/>
                    <section className="search-form_button-wrap">
                        {loading && <Roller width="38px" parentClass={'search-form_button-wrap_load'}/>}
                        <button className="search-form_button-wrap_button">Найти</button>
                    </section>
                </form>
            </section>
        );
    }
}


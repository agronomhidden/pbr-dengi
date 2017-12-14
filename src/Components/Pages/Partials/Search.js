import React, {Component} from 'react';
import {AutoComplete} from '../Partials'
import {Roller} from '../../Loading'
import PropTypes from 'prop-types';

export default class Search extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        searchValue: PropTypes.string.isRequired,
        setSearch: PropTypes.func.isRequired
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
        this.props.setSearch(this.state);
    };

    render() {
        const {props: {loading}, state: {searchQuery}} = this;
        return (
            <section className="search">
                <form className="search-form" onSubmit={this.onSubmit}>
                    <AutoComplete
                        name="searchQuery"
                        placeholder="Поиск предприятий и услуг"
                        value={searchQuery}
                        onChange={this.onChange}
                        wrapperModifier="search-form_group"
                        inputModifier="search-form_input"
                        disabled={loading}
                    />
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


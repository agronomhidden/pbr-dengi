import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup} from '../Partials'
import {Roller} from '../../Loading'
import {categoriesSearch} from "../../../Reducers/AC/categoriesAC"


class Search extends Component {

    state = {
        searchQuery: '',
    };

    componentWillMount(){

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.categoriesSearch(this.state);
    };

    render() {
        const {props: {loading}, state: {searchQuery}} = this;
        console.log(loading);
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

export default connect(
    (s => ({
        loading: s.categories.get('loading'),
    })),
    {categoriesSearch}
)(Search);


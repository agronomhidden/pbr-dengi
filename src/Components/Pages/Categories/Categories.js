import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageLayout from '../../Decorators/PageLayout';
import {Search, AutoComplete} from "../Partials"
import {mapToArr} from '../../../Utils/helper';
import {CategoriesRecord} from '../../../Reducers/entities';
import {getCategories, categoriesSearch} from "../../../Reducers/Requests/categoriesRequest"
import PageDataLoader from '../../Decorators/PageDataLoader';
import {categoriesSetSearch} from "../../../Reducers/AC/categoriesAC"
import {ServicesList, CategoriesList} from "./"

class Categories extends Component {

    render = () =>
        <div>
            <h3>Платежи</h3>
            <Search {...this.props}/>
            <CategoriesList categories={this.props.categories}/>
            <ServicesList categories={this.props.categories}/>
        </div>
}

export default connect(
    (s => ({
        categories: (s.categories.get('categories') && mapToArr(s.categories.get('categories'), CategoriesRecord)) || [],
        loading: s.categories.get('loading'),
        searchValue: s.categories.get('searchValue')
    })),
    {
        entitiesLoader: getCategories,
        setSearch: categoriesSetSearch,
        searchFunc: categoriesSearch,
    }
)(PageDataLoader(PageLayout(Categories)));

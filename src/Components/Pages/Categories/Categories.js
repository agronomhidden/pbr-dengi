import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageLayout from '../../Decorators/PageLayout';
import {Search} from "../Partials"
import {mapToArr} from '../../../Utils/helper';
import {CategoriesRecord} from '../../../Reducers/entities';
import CategoriesList from './CategoriesList';
import {getCategories} from "../../../Reducers/Requests/categoriesRequest"
import CategoryLoader from '../../Decorators/CategoryLoader';
import {categoriesSearch} from "../../../Reducers/AC/categoriesAC"

class Categories extends Component {

    render = () =>
        <section>
            <Search {...this.props}/>
            <CategoriesList categories={this.props.categories}/>
        </section>
}

export default connect(
    (s => ({
        categories: (s.categories.get('categories') && mapToArr(s.categories.get('categories'), CategoriesRecord)) || [],
        loading: s.categories.get('loading'),
        searchValue: s.categories.get('searchValue')
    })),
    {entitiesLoader: getCategories, searchFunc: categoriesSearch}
)(CategoryLoader(PageLayout(Categories)));

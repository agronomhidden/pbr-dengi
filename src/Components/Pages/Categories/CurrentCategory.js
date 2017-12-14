import React, {Component} from 'react'
import {connect} from 'react-redux'
import PageLayout from '../../Decorators/PageLayout'
import {Search} from "../Partials"
import {mapToArr} from '../../../Utils/helper'
import {CategoriesRecord} from '../../../Reducers/entities'

import {getCategories, categoriesSearch} from "../../../Reducers/Requests/categoriesRequest"
import PageDataLoader from '../../Decorators/PageDataLoader'
import {categoriesSetSearch} from "../../../Reducers/AC/categoriesAC"
import {ServicesList} from "./"

class Categories extends Component {

    render = () =>
        <div>
            <h3>Категория {!!this.props.categories[0] && this.props.categories[0].get('path')}</h3>
            <Search {...this.props}/>
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

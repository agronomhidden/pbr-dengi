import React, {Component} from 'react'
import {connect} from 'react-redux'
import PageLayout from '../../Decorators/PageLayout'
import {Search} from '../Partials'
import {mapToArr} from '../../../Utils/helper'
import {CategoriesRecord} from '../../../Reducers/entities'
import {getCategories, categoriesSearch, autoCompleteSearch} from '../../../Reducers/Requests/categoriesRequest'
import PageDataLoader from '../../Decorators/PageDataLoader'
import {categoriesSetSearch,resetAutoComplete} from '../../../Reducers/AC/categoriesAC'
import {ServicesList, CategoriesList} from './'

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
        categories:  mapToArr(s.categories.get('categories'), CategoriesRecord),
        loading: s.categories.get('loading'),
        searchValue: s.categories.get('searchValue'),
        autoCompleteWorks: s.categories.get('autoCompleteWorks'),
        autoCompleteLoading: s.categories.get('autoCompleteLoading'),
        autoCompleteDetected:  s.categories.get('autoCompleteDetected'),
    })),
    {
        entitiesLoader: getCategories,
        setSearch: categoriesSetSearch,
        searchFunc: categoriesSearch,
        autoCompleteFunc: autoCompleteSearch,
        resetAutoComplete: resetAutoComplete
    }
)(PageDataLoader(PageLayout(Categories)))

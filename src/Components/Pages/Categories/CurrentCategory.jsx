import React, {Component} from 'react'
import {connect} from 'react-redux'
import PageLayout from '../../Decorators/PageLayout'
import {Search} from '../Partials'
import {mapToArr} from 'pbr-lib-front-utils/dateManipulation'
import {CategoriesRecord} from '../../../Reducers/entities'
import {getCategories, categoriesSearch, autoCompleteSearch} from '../../../Reducers/AC/categoriesAC'
import PageDataLoader from '../../Decorators/PageDataLoader'
import {categoriesSetSearch, resetAutoComplete} from '../../../Reducers/AC/categoriesAC'
import {ServicesList, CategoriesList} from './index'


class CurrentCategory extends Component {


    _issetCategories = () => this.props.entities.find(({is_category}) => is_category)

    _issetServices = () => this.props.entities.find(({is_category}) => !is_category)

    getName = (categories) => {
        const record = categories.find(({is_category}) => !is_category)
        return record && record.path
    }

    render = () =>
        <div>
            <h3>Категория {this.getName(this.props.entities)}</h3>
            <Search {...this.props}/>
            {this._issetCategories() && <CategoriesList categories={this.props.entities}/>}
            {this._issetServices() && <ServicesList categories={this.props.entities}/>}
        </div>
}

export default connect(
    (s => ({
        entities: mapToArr(s.categories.get('categories'), CategoriesRecord),
        loading: s.categories.get('loading'),
        searchValue: s.categories.get('searchValue'),
        autoCompleteLoading: s.categories.get('autoCompleteLoading'),
        autoCompleteWorks: s.categories.get('autoCompleteWorks'),
        autoCompleteDetected: s.categories.get('autoCompleteDetected'),
        count_services: s.categories.get('count_services'),
        count_categories: s.categories.get('count_categories')
    })),
    {
        entitiesLoader: getCategories,
        setSearch: categoriesSetSearch,
        searchFunc: categoriesSearch,
        autoCompleteFunc: autoCompleteSearch,
        resetAutoComplete: resetAutoComplete
    }
)(PageDataLoader(PageLayout(CurrentCategory)));

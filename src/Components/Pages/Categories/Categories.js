import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageLayout from '../../Decorators/PageLayout';
import Search from "../Partials/Search"
import {mapToArr} from '../../../Utils/helper';
import {CategoriesRecord} from '../../../Reducers/entities';
import CategoriesList from './CategoriesList';
import {getCategories} from "../../../Reducers/Requests/categoriesRequest"

class Categories extends Component {

    componentWillMount() {
    }


    render = () =>
        <section>
            <Search/>
            <CategoriesList categories={this.props.categories}/>
        </section>

}

export default connect(
    (s => ({
        categories: s.categories.get('categories') ? mapToArr(s.categories.get('categories'), CategoriesRecord) : [],
        loading: s.categories.get('loading')
    })),
    {entitiesLoader: getCategories}
)(PageLayout(Categories));

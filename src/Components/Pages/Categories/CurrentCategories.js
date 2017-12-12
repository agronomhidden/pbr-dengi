import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PageLayout from "../../Decorators/PageLayout"
import {connect} from "react-redux"
import {mapToArr} from "../../../Utils/helper"
import {CategoriesRecord} from "../../../Reducers/entities"
import {getCategories} from "../../../Reducers/Requests/categoriesRequest"
import CategoryLoader from "../../Decorators/CategoryLoader"
import Search from "../Partials/Search"
import {categoriesSearch} from "../../../Reducers/AC/categoriesAC"

class CurrentCategories extends Component {


    static propTypes = {
        categories: PropTypes.array.isRequired
    }

    _getList = () =>
        this.props.categories.map((item) => {
                // console.log(item);
                if (item.is_category) {
                    return (
                        <div key={item.id} className='category'>
                            <img src={item.img} alt="Лого"/>
                            <Link to={`/categories/${item.id}`}>
                                {item.name}
                            </Link>
                        </div>
                    )
                }
            }
        )


    render = () =>
        <div className='category_wrap'>
            <Search {...this.props}/>
            {this._getList()}
        </div>


}


export default connect(
    (s => ({
        categories: (s.categories.get('categories') && mapToArr(s.categories.get('categories'), CategoriesRecord)) || [],
        loading: s.categories.get('loading'),
        searchValue: s.categories.get('searchValue')
    })),
    {entitiesLoader: getCategories, searchFunc: categoriesSearch}
)(CategoryLoader(PageLayout(CurrentCategories)));



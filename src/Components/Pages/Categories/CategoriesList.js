import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class CategoriesList extends Component {


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
                                <h3>{item.name}</h3>
                            </Link>
                        </div>
                    )
                }
            }
        )


    render = () =>
        <div className='category_wrap'>
            {this._getList()}
        </div>


}



import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class CategoriesList extends Component {

    static propTypes = {
        categories: PropTypes.array.isRequired,
    }

    _getList = () =>  this.props.categories.map((item) =>
            item.is_category && <div key={item.id} className="category">
                <img src={item.img} alt="Лого"/>
                <Link to={`/categories/${item.id}`}>
                    {item.name}
                </Link>
            </div>
        )

    render = () =>
        <section className='category_wrap'>
            <h5 style={{width:'100%'}}>Категории</h5>
            {this._getList()}
        </section>
}



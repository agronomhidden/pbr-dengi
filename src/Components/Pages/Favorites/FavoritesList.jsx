import React from 'react';
import {connect} from 'react-redux';
import {mapToArr} from 'pbr-lib-front-utils/dateManipulation'
import PageComponent from "../../App/PageComponent"
import PageLayout from '../../Decorators/PageLayout'
import {Link} from 'react-router-dom'
import {getFavorites, deleteFavorite} from '../../../Reducers/AC/favoritesAC'
import {FavoritesRecord} from '../../../Reducers/entities'
import Popover from "../Partials/Popover"



export class Favorites extends PageComponent {

    state = {
        popoverOpen: false
    }

    _onOpen = key => _ => {
        this.setState({popoverOpen: this.state.popoverOpen === key ? false : key})
    }

    _onClose = key => _ => {
        if (this.state.popoverOpen === key) {
            this.setState({popoverOpen: false})
        }
    }

    _deleteFavorite = (id, i) => e => {
        this.props.deleteFavorite({id})
        this._onClose(i)()
    }

    getFavoriteItems = () => this.props.data.map((item, i) =>
        <div key={i} className='history-items'>
            <div className='history-items_link'>
                <Link to={`/payments/${item.service_id}?favId=${item.id}`}>
                   {item.name}
                </Link>
            </div>
            <div className='history-items_link'>{item.category_name}/{item.service_name}</div>
            <Popover open={this.state.popoverOpen === i} onClose={this._onClose(i)}>
                <button className="button" onClick={this._onOpen(i)}>Удалить</button>
                <div className="popover">
                    Подтвердите действие
                    <button style={{backgroundColor: 'lightRed'}}
                            onClick={this._deleteFavorite(item.id, i)}>Удалить</button>
                </div>
            </Popover>
            <div className='history-items_link'>
                <Link to={`/favorites/${item.id}`}>Редактировать</Link>
            </div>
        </div>)


    render = () =>
        <div>
            <h1>Избранные платежи</h1>
            {this.getFavoriteItems()}
        </div>
}

export default connect(
    (s => ({
        data: mapToArr(s.favorites.get('favorites'), FavoritesRecord),
        loading: s.favorites.get('loading')
    })),
    {dataLoader: getFavorites, deleteFavorite}
)(PageLayout(Favorites))

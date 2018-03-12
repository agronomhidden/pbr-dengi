import React, {Component} from 'react';
import {connect} from "react-redux"

import FormGroup from "../Partials/FormGroup"
import PageLayout from "../../Decorators/PageLayout"
import {updateFavorite} from "../../../Reducers/AC/favoritesAC"
import {Link} from "react-router-dom"


export class Favorite extends Component {

    state = {
        name: '',
        errors: {}
    }

    componentWillMount() {
        const {favorite, history} = this.props
        if (favorite) {
            this.setState({name: favorite.get('name')})
        } else {
            history.replace('/not-found')
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.errors && this.setState({errors: nextProps.errors});
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    _onSubmit = (e) => {
        e.preventDefault()
        const {state: {name}, props: {id}} = this
        this.props.updateFavorite({id, name})
    }

    _repeatPay = (e) => {
        e.preventDefault()
        this.props.repeatPay(this.props.id)
    }

    render = () => {
        return <div>
            <form onSubmit={this._onSubmit}>
                <FormGroup onChange={this._onChange} name='name' errors={this.state.errors}
                           label={'Название'} value={this.state.name}/>
                <button type='submit'>Сохранить</button>
            </form>
            <button onClick={this._repeatPay}><i>Повторить платеж</i></button>
        </div>
    }


}


export default connect(
    ((s, p) => {
        const id = Number(p.match.params.id)
        return {
            favorite: s.favorites.get('favorites').get(id),
            loading: s.favorites.get('loading'),
            errors: s.favorites.get('errors'),
            id
        }
    }),
    {updateFavorite}
)(PageLayout(Favorite))


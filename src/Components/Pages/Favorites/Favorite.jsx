import React from 'react';
import {connect} from "react-redux"

import FormGroup from "../Partials/FormGroup"
import PageLayout from "../../Decorators/PageLayout"
import {getFavorites, updateFavorite} from "../../../Reducers/AC/favoritesAC"
import {Link} from "react-router-dom"
import PageComponent from "../../App/PageComponent"
import {Map} from 'immutable'

export class Favorite extends PageComponent {

    state = {
        name: '',
        service_id: '',
        loading: true,
        errors: {}
    }

    componentDidMount() {
        this.setFavorite(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        this.setFavorite(nextProps.data);
        nextProps.errors && this.setState({errors: nextProps.errors});
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}});
    }

    _onSubmit = (e) => {
        e.preventDefault()
        const {state: {name}, props: {id}} = this
        this.props.updateFavorite({id, name})
    }

    setFavorite(favorites) {
        if (Map.isMap(favorites)) {
            const favorite = favorites.get(this.props.id);
            if (favorite) {
                this.setState({name: favorite.get('name'), service_id: favorite.get('service_id'), loading: false});
            } else {
                this.props.history.replace('/not-found');
            }
        }
    }

    render() {
        let render = <div>Загрузка</div>

        if (!this.state.loading) {
            render =
                <div>
                    <form onSubmit={this._onSubmit}>
                        <FormGroup onChange={this._onChange} name='name' errors={this.state.errors}
                                   label={'Название'} value={this.state.name}/>
                        <button type='submit'>Сохранить</button>
                    </form>
                    <Link to={`/payments/${this.state.service_id}?favId=${this.props.id}`}>
                        <i>Повторить платеж</i>
                    </Link>
                </div>
        }
        return render;
    }
}

export default connect(
    (s, p) => {
        return {
            data: s.favorites.get('favorites'),
            errors: s.favorites.get('errors'),
            id: Number(p.match.params.id)
        }
    },
    {dataLoader: getFavorites, updateFavorite}
)(PageLayout(Favorite))
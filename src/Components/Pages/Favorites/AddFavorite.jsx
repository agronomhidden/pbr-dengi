import React, {Component} from 'react';
import {connect} from "react-redux"

import FormGroup from "../Partials/FormGroup"
import {addFavorite} from "../../../Reducers/AC/favoritesAC"
import PropTypes from 'prop-types'

export class AddFavorite extends Component {

    state = {
        name: '',
        success: false,
        errors: {}
    }

    static propTypes = {
        payment_key: PropTypes.string.isRequired,
        onClose: PropTypes.func,
        block: PropTypes.number
    }

    componentWillReceiveProps(nextProps) {
        nextProps.errors && this.setState({errors: nextProps.errors});
        if (nextProps.success && this.props.onClose) {
            this.setState({success: true})
            setTimeout(() => {
                this.props.onClose()
            }, 1000)
        }

    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    _onSubmit = (e) => {
        e.preventDefault()
        const {state: {name}, props: {payment_key}} = this
        this.props.addFavorite({key: payment_key, name})
    }

    render() {
        return (
            <div className="popover">
                {!this.state.success ?
                    <form onSubmit={this._onSubmit} style={{display: 'grid'}}>
                        <FormGroup onChange={this._onChange} name='name' errors={this.state.errors}
                                   placeholder={'Название'} value={this.state.name}/>
                        <button type='submit'>Сохранить</button>
                    </form> :
                    <span>Платеж добавлен в избранное</span>
                }
            </div>
        )
    }
}


export default connect(
    (s => ({
        loading: s.favorites.get('loading'),
        errors: s.favorites.get('errors'),
        success: s.favorites.get('success')
    })),
    {addFavorite}
)(AddFavorite)


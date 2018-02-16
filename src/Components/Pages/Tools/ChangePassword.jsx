import React, {Component} from 'react'
import {connect} from "react-redux"

import FormGroup from "../Partials/FormGroup"
import {Button} from "../Partials"
import {changePassword} from "../../../Reducers/Requests/setingsRequest"
import PropTypes from 'prop-types';

export class ChangePassword extends Component {

    static propTypes = {
        changePassword: PropTypes.func.isRequired,
        blockManagement: PropTypes.func.isRequired,
        block: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired,
        successMsg: PropTypes.bool
    }

    state = {
        errors: {},
        password: '',
        passwordRepeat: ''
    }

    componentWillReceiveProps(nextProps) {
        const {errors, successMsg} = nextProps
        errors && this.setState({errors})
        if (successMsg) {
            this.props.blockManagement(this.props.block, successMsg)
        }
    }

    _onSubmit = (e) => {
        e.preventDefault()
        this.props.changePassword(this.state)
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    render = () =>
        <div>
            <form onSubmit={this._onSubmit}>
                <FormGroup label='Новый пароль' type='password' name='password' errors={this.state.errors}
                           value={this.state.password} onChange={this._onChange} disabled={this.props.loading}
                           hint={'Минимальная длина 8 символов. Должен содержать цифры, заглавные и строчные символы'}/>
                <FormGroup label='Подтвердите пароль' type='password' name='passwordRepeat' errors={this.state.errors}
                           value={this.state.password_repeat} onChange={this._onChange} disabled={this.props.loading}/>
                <Button disabled={this.props.loading}>Сохранить</Button>
            </form>
        </div>
}

export default connect(
    (s => (
        {
            loading: s.settings.get('ChPLoading'),
            successMsg: s.settings.get('ChPSuccessMsg'),
            errors: s.settings.get('errors')
        }
    )), {changePassword}
)(ChangePassword)
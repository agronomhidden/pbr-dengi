import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup} from '../Partials'
import {Roller} from '../../Loading'
import {setFieldError} from 'pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper'
import {userLogin} from "../../../Reducers/Requests/loginCurrentUserRequest"
import favicon from '../../../../public/favicon.ico';

class Login extends Component {

    state = {
        phone: '',
        password: '',
        errors: {},
    };

    componentWillReceiveProps(nextProps) {
        nextProps.errors && this.setState({errors: nextProps.errors});
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        delete this.state.errors;
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.isValid() && this.props.userLogin(this.state);
    };

    isValid() {
        if (this.state.phone.replace(/\D/g, '').length < 12) {
            this.setState(setFieldError(this.state, 'phone', 'Ошибка ввода номера'));
            return false
        }
        return true
    }

    render() {
        const {props: {loading}, state: {errors}} = this;
        return (
            <div className="admin-login">
                <header className="admin-login_header">Авт{<img src={favicon} alt="МТС"/>}ризуйся же!</header>
                <form className="form-group -form-simple" method="POST" onSubmit={this.onSubmit}>
                    <fieldset disabled={loading}>
                        <FormGroup name="phone" label="Номер телефона" value={this.state.phone} maskChar='*'
                                   alwaysShowMask={true} mask="+375\ (99) 999 - 9999"
                                   onChange={this.onChange} errors={errors}/>
                        <FormGroup name="password" type="password" label="Пароль" value={this.state.password}
                                   onChange={this.onChange} errors={errors}/>
                        <div className="admin-login-buttons">
                            <div className="admin-login-buttons-left">
                                <a href="/">На главную</a>
                            </div>
                            <div className="admin-login-buttons-right">
                                {loading && <Roller width="38px" parentClass={'login-loading'}/>}
                                <button className="danger">Войти</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default connect(
    (s => ({
        loading: s.auth.get('loading'),
        errors: s.auth.get('errors'),
    })),
    {userLogin}
)(Login);


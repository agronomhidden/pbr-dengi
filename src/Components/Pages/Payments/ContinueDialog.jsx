import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Roller} from "../../Loading"
import {Link} from "react-router-dom"

export default class ContinueDialog extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        showButt: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
    }

    state = {
        agreement: false,
        error: null
    }

    _onCheck = ({target: {name, checked}}) => {
        this.setState({[name]: checked, error: null})
    }

    _onClick = (e) => {
        e.preventDefault();
        if (this.props.subscription.agreement_required && !this.state.agreement) {
            this.setState({error: "Для проведения платежа необходимо подтвердить согласие на подключение услуги «МТС Деньги»"})
            return false
        }
        this.props.onSubmit()
    }

    render() {
        const {loading, showButt, subscription} = this.props

        const button = <button onClick={this._onClick}>Отправить</button>

        let render = <Roller parentClass="form-group_field-loading" width={'15px'}/>

        if (!loading && showButt) {
            render = button
        }

        if (subscription.get('agreement_required')) {
            render =
                <div>
                    <h5>
                        <div>
                            <input type="checkbox" name="agreement" onChange={this._onCheck}
                                   checked={this.state.agreement}/>
                            Нажимая «Оплатить», Вы подтверждаете, что ознакомлены и согласны с
                            <Link to="/help/user-agreement" target="_blank">Правилами&nbsp;системы</Link>и
                            подключением
                            услуги
                            «МТС&nbsp;Деньги». <span className="rules_agree-info">{subscription.get('info')}</span>
                        </div>
                        <span style={{marginTop: '10px', color: 'red'}}>{this.state.error}</span>
                    </h5>
                    {button}
                </div>

        }

        return render
    }
}

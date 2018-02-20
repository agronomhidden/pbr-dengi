import React, {Component} from 'react'
import {connect} from "react-redux"

import PropTypes from 'prop-types';
import {Button} from "../Partials"
import {delSubscription} from "../../../Reducers/Requests/setingsRequest"

export class DeleteSubscription extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        fail: PropTypes.bool.isRequired,
        success: PropTypes.bool.isRequired,
        delSubscription: PropTypes.func.isRequired,
    }

    _onClick = () => {
        this.props.delSubscription()
    }

    render = () =>
        <div>
            {this.props.success &&
            <h3 className="stop-subscription_result">
                <strong>Ваш запрос на удаление услуги «МТС Деньги» принят, ожидайте
                    подтверждение по SMS</strong>
            </h3>}
            <h3><strong>Внимание!</strong></h3>
            <p>Вы действительно хотите удалить услугу «МТС&nbsp;Деньги»?</p>
            <div>
                <Button className="stop-subscription_button mts-button"
                        onClick={this._onClick}><span>Удалить услугу</span></Button>
                {this.props.fail &&
                <div className="setting-error --stop--error" style={{color: 'red'}}>
                    Произошла ошибка. Повторите попытку позже.
                </div>}
            </div>
        </div>
}

export default connect(
    (s => (
        {
            loading: s.settings.get('DSLoading'),
            fail: s.settings.get('DSFail'),
            success: s.settings.get('DSSuccess'),
        }
    )), {delSubscription}
)(DeleteSubscription)
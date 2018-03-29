import React from 'react';
import {connect} from 'react-redux';
import PageComponent from "../../App/PageComponent"
import PageLayout from "../../Decorators/PageLayout"
import {Recharge} from "../Assist"

export class RechargeDialog extends PageComponent {

    render = () => this.props.loaded ?
        <div>
            <h1>Оплата услуги</h1>
            <Recharge/>
        </div> :
       <div>Ошибка получения данных</div>
}


export default connect(({payInvoices}) => ({
    loaded: payInvoices.get('requirementLoaded'),
}))(PageLayout(RechargeDialog))
import React from 'react';

import PageComponent from "../../App/PageComponent"

import PrintComponent from "../../Decorators/PrintComponent"

import PropTypes from 'prop-types';

import {SendHistoryItemToMail, PrintHistoryItem} from "./index"


export default class HistoryItems extends PageComponent {

    static propTypes = {
        entities: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        sending: PropTypes.bool.isRequired,
        mailSection: PropTypes.object.isRequired,
        mailSender: PropTypes.func.isRequired
    }

    getReceipts = () => this.props.entities.map((receipt, key) =>
        <div key={key}>
            <div className="payment-result_item">
                <h5 className="-pb3">Услуга:</h5>
                <h3>{receipt.service.name}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Город:</h5>
                <h3>{receipt.service.location ? receipt.service.location.name : <i>'(Нет)'</i>}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Категория:</h5>
                <h3>{receipt.category_name}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Дата проведения:</h5>
                <h3>{receipt.date_pay}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Код транзакции:</h5>
                <h3>{receipt.transaction_uuid}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Сумма к оплате:</h5>
                <h3>{receipt.sum + ' ' + receipt.currency}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Без учета комиссии:</h5>
                <h3>{receipt.total_sum + ' ' + receipt.currency}</h3>
            </div>
            <div className="payment-result_item">
                <h5 className="-pb3">Размер комиссии:</h5>
                <h3>{receipt.commission + ' ' + receipt.currency}</h3>
            </div>
            {this.getFields(receipt.fields)}
            {receipt.status === "SUCCESS" &&
            <SendHistoryItemToMail sender={this.props.mailSender} receiptKey={receipt.key} sectionID={key}
                                   mailSection={this.props.mailSection.get(key)} sending={this.props.sending}/>}
            {receipt.status === "SUCCESS" &&
            <PrintComponent buttonText='Распечатать квитанцию' buttonClass='search-form_button-wrap_button'>
                <PrintHistoryItem receipt={receipt}/>
            </PrintComponent>
            }
            <hr/>
        </div>)

    getFields = fields => fields.map(({name, value}, key) => {
        if (name && value) {
            return <div key={key} className="payment-result_item">
                <h5>{name}:</h5>
                <h3>{value}</h3>
            </div>
        }
    })

    render = () =>
        <div>
            <h1> Квитанция об оплате </h1>
            {this.getReceipts()}
        </div>
}

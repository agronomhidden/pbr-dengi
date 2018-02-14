import React from 'react';
import {connect} from 'react-redux';
import PageLayout from "../../Decorators/PageLayout"
import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"
import {payHistoryRecord} from "../../../Reducers/entities"
import {PrintReceipt} from "./PrintReceipt"
import PrintComponent from "../../Decorators/PrintComponent"
import {getHistoryItem} from "../../../Reducers/Requests/payHistoryRequest"
import {mailSender} from "../../../Reducers/Requests/mailSenderRequest"
import PageComponent from "../../App/PageComponent"
import PageDataLoader from "../../Decorators/PageDataLoader"
import SendMail from "./SendReceiptToMail"


export class Receipt extends PageComponent {

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
            <SendMail sender={this.props.mailSender} receiptKey={receipt.key} sectionID={key}
                      mailSection={this.props.mailSection.get(key)} sending={this.props.sending}/>}
            {receipt.status === "SUCCESS" &&
            <PrintComponent buttonText='Распечатать квитанцию' buttonClass='search-form_button-wrap_button'>
                <PrintReceipt receipt={receipt}/>
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

    render = () => <div>
        <h1> Квитанция об оплате </h1>
        {this.getReceipts()}
    </div>

}

export default connect(
    (s => ({
        entities: mapToArr(s.payHistory.get('payments'), payHistoryRecord),
        loading: s.payHistory.get('loading'),
        sending: s.mailSender.get('sending'),
        mailSection: s.mailSender.get('mailSection'),
    })), {entitiesLoader: getHistoryItem, mailSender}
)(PageDataLoader(PageLayout(Receipt)))
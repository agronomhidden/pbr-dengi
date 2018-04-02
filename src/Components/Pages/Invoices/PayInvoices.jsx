import React from 'react';
import {connect} from 'react-redux';
import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"

import PageComponent from "../../App/PageComponent"
import PageLayout from "../../Decorators/PageLayout"
import {Invoice, Pay} from './';
import InvoiceEntity from "../../../Reducers/Entities/InvoiceEntity"
import {loadInvoices} from "../../../Reducers/AC/accountsAC"
import {RechargeWithTeaser} from "../Assist"
import {Roller} from "../../Loading"
import {getRechargeRequirement} from "../../../Reducers/AC/payIvoicesAC"


export class PayInvoices extends PageComponent {


    getHistoryBlocks = () =>
        this.props.data.map((invoice, key) => <Invoice key={key} invoice={invoice}/>)

    componentWillMount() {
        super.componentWillMount()
        const transaction_uuids = this.props.data.map(item => item.transaction_uuid)
        this.props.getRechargeRequirement({transaction_uuids})
    }

    render() {
        const {loading, directPay, data} = this.props;
        let render = <div>Ошибка получения данных</div>
        if (!loading && data.length) {
            render = <div>
                <h1>Оплатить счета</h1>
                {this.getHistoryBlocks()}
                {directPay === false && <RechargeWithTeaser/>}
                {directPay === true && <Pay invoices={data}/>}
            </div>
        }
        if (loading) {
            render = <Roller/>
        }

        return render;
    }

}

function mapStateToProps({accounts, payInvoices}, p) {
    const transaction_uuids = p.match.params.transaction_uuids
    const invoices = accounts.get('invoices').filter(item => transaction_uuids.includes(item.get('transaction_uuid')))
    return {
        data: mapToArr(invoices, InvoiceEntity),
        directPay: payInvoices.get('directPay'),
        loading: payInvoices.get('requirementLoading')
    }
}

export default connect(mapStateToProps, {
    dataLoader: loadInvoices,
    getRechargeRequirement
})(PageLayout(PayInvoices))
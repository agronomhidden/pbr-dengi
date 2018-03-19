import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {mapToArr} from "pbr-lib-front-utils/dateManipulation";
import {connect} from "react-redux";

import InvoiceEntity from '../../../Reducers/Entities/InvoiceEntity'
import {  } from '../../../Reducers/AC/accountsAC'

/**
 * @property {Array<InvoiceEntity>} props.invoices
 */
class Invoices extends Component {
    static propTypes = {
        invoices: PropTypes.arrayOf(PropTypes.instanceOf(InvoiceEntity))
    }

    renderList() {
        return this.props.invoices.map(invoice => (
            <div key={invoice.getTransactionUuid()}>{invoice.getName()} {invoice.getSumWithCommission()}</div>
        ))
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        )
    }
}

export default connect(
    ({accounts}) => ({
        invoices: mapToArr(accounts.get('invoices'), InvoiceEntity)
    })
)(Invoices)

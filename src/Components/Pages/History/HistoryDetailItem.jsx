import React from 'react';
import {connect} from 'react-redux';
import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"

import PageComponent from "../../App/PageComponent"
import PageLayout from "../../Decorators/PageLayout"
import {mailSender} from "../../../Reducers/AC/mailSenderAC"
import {payHistoryRecord} from "../../../Reducers/entities"
import {getHistoryItems} from "../../../Reducers/AC/payHistoryAC"
import {HistoryItem} from "../History/index"

export class HistoryDetailItem extends PageComponent {

    getHistoryBlocks = ({historyItems, loading, sending, mailSection, mailSender, transaction_uuids, getHistoryItems}) =>
        historyItems.size && mapToArr(historyItems,payHistoryRecord).map((historyItem, key) =>
            <HistoryItem key={key}
                         historyItem={historyItem}
                         loading={loading}
                         sending={sending}
                         mailSection={mailSection}
                         mailSender={mailSender}
                         getHistoryItems={getHistoryItems}
                         transaction_uuids={transaction_uuids}/>)

    componentDidMount() {
        const {historyItems, transaction_uuids, getHistoryItems} = this.props

        let uuids = []

        if (typeof transaction_uuids === 'string') {
            uuids = transaction_uuids.split(',')
        }

        !historyItems.size || historyItems.size !== uuids.length && getHistoryItems({transaction_uuids})

        for (let transaction_uuid of uuids) {
            const item = historyItems.get(transaction_uuid)
            if (!item || item.get(status) === 'IN_PROCESS') {
                getHistoryItems({transaction_uuids})
                break
            }
        }
    }

    render = () =>
        <div>
            <h1>Квитанции об оплате</h1>
            {this.getHistoryBlocks(this.props)}
        </div>
}

export default connect(
    ((s, p) => {
        return {
            historyItems: s.payHistory.get('historyItems'),
            loading: s.payHistory.get('HILoading'),
            sending: s.mailSender.get('sending'),
            mailSection: s.mailSender.get('mailSection'),
            transaction_uuids: p.match.params.transaction_uuids
        }
    }), {getHistoryItems, mailSender}
)(PageLayout(HistoryDetailItem))
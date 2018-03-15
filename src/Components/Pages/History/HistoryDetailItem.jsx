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


    state = {
        popoverOpen: false
    }

    _onOpen = key => _ => {
        this.setState({popoverOpen: this.state.popoverOpen === key ? false : key})
    }

    _onClose = key => _ => {
        if (this.state.popoverOpen === key) {
            this.setState({popoverOpen: false})
        }
    }

    componentDidMount() {
        const {historyItems, historyLoader, transaction_uuids} = this.props
        if (!historyItems.length || historyItems.some((item => item.status === 'IN_PROCESS'))) {
            historyLoader({transaction_uuids})
        }
    }

    getHistoryBlocks = ({historyItems, sending, mailSection, mailSender, user}) =>
        historyItems.length && historyItems.map((historyItem, key) =>
            <HistoryItem key={key}
                         historyItem={historyItem}
                         user={user}
                         onOpen={this._onOpen(key)}
                         onClose={this._onClose(key)}
                         sending={sending}
                         mailSection={mailSection}
                         mailSender={mailSender}
                         popoverOpen={this.state.popoverOpen === key}
            />)
        || <span>Нет данных для отабражения</span>

    render = () =>
        <div>
            <h1>Квитанции об оплате</h1>
            {this.getHistoryBlocks(this.props)}
        </div>
}

function mapStateToProps(s, p) {
    const {transaction_uuids} = p.match.params
    const historyItems = s.payHistory.get('historyItems').filter((item, key) => transaction_uuids.includes(key))
    return {
        historyItems: mapToArr(historyItems, payHistoryRecord),
        transaction_uuids,
        loading: s.payHistory.get('HILoading'),
        sending: s.mailSender.get('sending'),
        mailSection: s.mailSender.get('mailSection'),
        user: s.auth.get('user')
    }
}

export default connect(
    (mapStateToProps), {historyLoader: getHistoryItems, mailSender}
)(PageLayout(HistoryDetailItem))
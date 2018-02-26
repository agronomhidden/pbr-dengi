import React from 'react';
import {connect} from 'react-redux';
import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"

import PageComponent from "../../App/PageComponent"
import PageLayout from "../../Decorators/PageLayout"
import PageDataLoader from "../../Decorators/PageDataLoader"
import {mailSender} from "../../../Reducers/AC/mailSenderAC"
import {payHistoryRecord} from "../../../Reducers/entities"
import {getHistoryItems} from "../../../Reducers/AC/payHistoryAC"
import {HistoryItems} from "../History/index"

export class HistoryDetailItem extends PageComponent {

    render = () => <HistoryItems {...this.props}/>
}

export default connect(
    (s => ({
        entities: mapToArr(s.payHistory.get('historyItems'), payHistoryRecord),
        loading: s.payHistory.get('HILoading'),
        sending: s.mailSender.get('sending'),
        mailSection: s.mailSender.get('mailSection'),
    })), {entitiesLoader: getHistoryItems, mailSender}
)(PageDataLoader(PageLayout(HistoryDetailItem)))
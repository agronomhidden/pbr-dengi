import React from 'react';
import {connect} from 'react-redux';
import PageComponent from '../../App/PageComponent'
import {mapToArr} from 'pbr-lib-front-utils/dateManipulation'
import PageLayout from '../../Decorators/PageLayout'
import {HistoryForm} from './index'
import {Link} from 'react-router-dom'
import {getHistoryList} from '../../../Reducers/AC/payHistoryAC'
import {payHistoryRecord} from '../../../Reducers/entities'


export class History extends PageComponent {

    state = {
        date_from: '',
        date_to: '',
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value})
    }

    _onSubmit = (e) => {
        e.preventDefault()
        this.props.dataLoader(this.state)
    }

    getHistoryItems = () => this.props.data && this.props.data.map((item, i) =>
        <div key={i}>
            <Link to={`/history-items/${item.transaction_uuid}`}>{item.item_name}</Link>
            <span> {item.status}</span>
        </div>)


    render = () =>
        <div>
            <HistoryForm onSubmit={this._onSubmit} onChange={this._onChange} {...this.state}/>
            {this.getHistoryItems()}
        </div>

}

export default connect(
    (s => ({
        data: mapToArr(s.payHistory.get('historyList'), payHistoryRecord),
        loading: s.payHistory.get('HlLoading')
    })),
    {dataLoader: getHistoryList}
)(PageLayout(History))
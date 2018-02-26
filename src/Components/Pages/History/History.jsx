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
        dateFrom: '',
        dateTo: '',
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value})
    }

    _onSubmit = (e) => {
        e.preventDefault()
    }

    getHistoryItems() {
        return this.props.data && this.props.data.map((item, i) => {
            return <div key={i}>
                <Link to={`history-items/${item.transaction_uuid}`}>{item.item_name}</Link>
                <span> {item.status}</span>
            </div>
        })
    }

    render() {
        return (<div>
            <HistoryForm onSubmit={this._onSubmit} onChange={this._onChange}
                         dateFrom={this.state.dateFrom}
                         dateTo={this.state.dateTo}/>
            {this.getHistoryItems()}
        </div>);
    }
}

export default connect(
    (s => ({
        data: mapToArr(s.payHistory.get('historyList'), payHistoryRecord),
        loading: s.payHistory.get('HlLoading')
    })),
    {dataLoader: getHistoryList}
)(PageLayout(History))
import React from 'react';
import {connect} from 'react-redux';
import PageComponent from "../../App/PageComponent"
import {mapToArr} from "pbr-lib-front-utils/dateManipulation"
import PageDataLoader from "../../Decorators/PageDataLoader"
import PageLayout from "../../Decorators/PageLayout"
import HistoryForm from "./HistoryForm"


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

        console.dir(this.state);
    }

    getHistoryItems() {
        return this.props.entities.map((item, i) => {
            return <div key={i}>
                {item.name}
            </div>
        })
    }

    render() {
        return (<div>
            <HistoryForm onSubmit={this._onSubmit} onChange={this._onChange} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo}/>
            {this.getHistoryItems()}
        </div>);
    }
}

export default connect(
    (s => ({
        entities: mapToArr(s.history.get('historyItems')),
        loading: s.history.loading,
        loaded: s.history.loaded,
    })),
    {entitiesLoader: getHistory}
)(PageDataLoader(PageLayout(History)));
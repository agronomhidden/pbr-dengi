import React, {Component} from 'react'
import {connect} from 'react-redux'
import PageLayout from '../../Decorators/PageLayout'
import {initDialog, requestInDialog} from '../../../Reducers/Requests/eripDialogRequest'
import PageDataLoader from '../../Decorators/PageDataLoader'
import {DialogFieldsRecord} from "../../../Reducers/entities"
import {mapToArr, prepareRequestDialogFields} from "../../../Utils/helper"
import {DialogBlock} from "./index"

class Payments extends Component {

    _setFieldsState = (fieldState) =>  {
        console.log(fieldState);
        this.setState(fieldState)
    }

    _onSubmit = (e) => {
        e.preventDefault();
        const {props: {mts_session, requestInDialog, match: {params: {id}}}, state} = this
        console.log(state);
        const requestObject = Object.assign(
            prepareRequestDialogFields(state),
            {
                serviceCode: id,
                mts_session: mts_session
            })

        requestInDialog(requestObject)
    }

    _getDialogMap = () =>
        this.props.dialogBlocks.map((record, i) =>
            <DialogBlock
                key={i}
                fields={mapToArr(record.get('fields'), DialogFieldsRecord)}
                summary={record.get('summary')}
                _setFieldsState={this._setFieldsState}
                loading={this.props.loading}
            />)

    render = () =>
        <div>
            <h3>Заголовок платежа</h3>
            <form method="POST" onSubmit={this._onSubmit}>
                {this._getDialogMap()}
                <button>Отправить</button>
            </form>
        </div>
}

export default connect(
    (s => ({
        dialogBlocks: s.eripDialog.get('dialogBlocks'),
        loading: s.eripDialog.get('loading'),
        mts_session: s.eripDialog.get('mts_session')
    })),
    {
        entitiesLoader: initDialog,
        requestInDialog
    }
)(PageDataLoader(PageLayout(Payments)));


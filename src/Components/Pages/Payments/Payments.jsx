import React, {Component} from 'react'
import {connect} from 'react-redux'
import PageLayout from '../../Decorators/PageLayout'
import {initDialog, requestInDialog} from '../../../Reducers/Requests/eripDialogRequest'
import PageDataLoader from '../../Decorators/PageDataLoader'
import {DialogFieldsRecord} from "../../../Reducers/entities"
import {prepareRequestDialogFields} from "../../../Utils/helper"
import {mapToArr} from 'pbr-lib-front-utils/dateManipulation'
import {DialogBlock} from "./index"
import {Roller} from "../../Loading"

class Payments extends Component {

    fieldState = {}

    _setFieldsState = (fieldState) => {
        this.fieldState = fieldState
    }

    _onSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        const {props: {mts_session, requestInDialog, entities, match: {params: {id}}}, fieldState} = this

        let requestObj = {}
        for (let name in fieldState) {
            const fieldProps = entities.find(record => {
                console.log(record.get('fields').get('name'));
                return record.get('fields')[name] || false;
            })

            if (fieldProps.originalField) {
                requestObj['fields[' + name + ']'] = fieldState[name]
            }
            requestObj[name] = fieldState[name]
        }
        // const requestObject = Object.assign(
        //     prepareRequestDialogFields(fieldState),
        //     {
        //         serviceCode: id,
        //         mts_session: mts_session
        //     })

        //  requestInDialog(requestObject)
    }

    _getDialogMap = () =>
        this.props.entities.map((record, i) =>
            <DialogBlock key={i}
                         fields={mapToArr(record.get('fields'), DialogFieldsRecord)}
                         summary={record.get('summary')}
                         _setFieldsState={this._setFieldsState}
                         loading={this.props.loading}/>)

    render = () =>

        <div>
            <h3>Заголовок платежа</h3>
            {this.props.fault ?
                <h3 style={{backgroundColor: 'red'}}>{this.props.fault}</h3>
                :
                <form method="POST" onSubmit={this._onSubmit}>
                    {this._getDialogMap()}
                    {this.props.loading ?
                        <Roller parentClass="form-group_field-loading" width={'15px'}/> :
                        <button>Отправить</button>
                    }
                </form>
            }
        </div>
}

export default connect(
    (s => ({
        entities: s.eripDialog.get('dialogBlocks'),
        loading: s.eripDialog.get('loading'),
        mts_session: s.eripDialog.get('mts_session'),
        fault: s.eripDialog.get('fault')
    })),
    {
        entitiesLoader: initDialog,
        requestInDialog
    }
)(PageDataLoader(PageLayout(Payments)));



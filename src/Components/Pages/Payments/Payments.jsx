import React, {Component,} from 'react'
import {connect} from 'react-redux'
import PageLayout from '../../Decorators/PageLayout'
import {initDialog, requestInDialog} from '../../../Reducers/Requests/eripDialogRequest'
import PageDataLoader from '../../Decorators/PageDataLoader'

import {mapToArr} from 'pbr-lib-front-utils/dateManipulation'
import {DialogBlock} from "./index"
import {Roller} from "../../Loading"
import {setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import {prepareOriginFieldPhone} from "../../../Utils/helper"

class Payments extends Component {

    /**@var Object конченое состояние перед полготовкой к отправке */
    fieldState = {}

    state = {
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    _setFieldsState = (fieldState) => {
        this.fieldState = fieldState
    }

    _clearErrors = () => {
        this.setState({errors: {}})
    }

    _onSubmit = (e) => {
        e.preventDefault();
        const {mts_session, requestInDialog, entities, match: {params: {id}}} = this.props
        const prepareFields = this._prepareRequestDialogFields(this.fieldState, entities)
        prepareFields && requestInDialog(Object.assign(prepareFields, {serviceCode: id, mts_session: mts_session}))
    }

    _prepareRequestDialogFields = (fieldState, entities) => {

        let preparedParams = {}

        for (let name in fieldState) {
            let fieldProps = {};
            entities.forEach(record => {
                if (record.get('fields').get(name)) {
                    fieldProps = record.get('fields').get(name)
                    return false
                }
            })
            if (fieldProps) {
                let fieldValue = fieldState[name]
                const {originalField, mask} = fieldProps
                if (!this._validateFields(fieldValue, name, fieldProps)) {
                    return false
                }
                if (fieldValue instanceof Date) {
                    let month = String(fieldValue.getMonth() + 1);
                    month = month.length !== 2 ? `0${month}` : month
                    const year = String(fieldValue.getFullYear()).substr(2, 4)
                    fieldValue = month + year;
                }
                if (originalField) {
                    preparedParams['fields[' + name + ']'] = mask ? prepareOriginFieldPhone(fieldValue, mask.prefix) : fieldValue
                } else {
                    preparedParams[name] = fieldValue
                }
            }
        }
        return preparedParams;
    }

    _validateFields = (fieldValue, name, {minLength, maxLength}) => {
        let text = '';

        if (minLength && fieldValue.length < minLength) {
            text = `длина значения поля должна быть не менеее ${minLength}`
        }
        if (maxLength && fieldValue.length > maxLength) {
            text = `длина значения поля должна быть не более ${maxLength}`
        }
        if (text) {
            this.setState(setFieldError(this.state, name, text))
            return false
        }
        return true
    }

    _onInValid = (e) => {
        e.preventDefault()
        for (let element of e.target.form.elements) {
            element.validationMessage && this.setState(setFieldError(this.state, element.name, element.validationMessage))

        }
    }

    _getDialogMap = () => this.props.entities.map((record, i) =>
        <DialogBlock key={i}
                     fields={mapToArr(record.get('fields'))}
                     summary={record.get('summary')}
                     setFieldsState={this._setFieldsState}
                     errors={this.state.errors}
                     clearErrors={this._clearErrors}
                     disabled={this.props.entities.size > ++i}
                     onSubmit={this._onSubmit}
                     loading={this.props.loading}/>)

    render = () =>
        <div>
            <h3>Заголовок платежа</h3>
            {this.props.fault ?
                <h3 style={{backgroundColor: 'red'}}>{this.props.fault}</h3>
                :
                <form method="POST" onSubmit={this._onSubmit} onInvalid={this._onInValid}>
                    {this._getDialogMap()}
                    {this.props.loading ?
                        <Roller parentClass="form-group_field-lgit oading" width={'15px'}/> :
                        !!this.props.entities.size && <button>Отправить</button>
                    }
                </form>
            }
            {this.props.success && <span>Диалог завершен успешно!</span>}
        </div>
}

export default connect(
    (s => ({
        entities: s.eripDialog.get('dialogBlocks'),
        loading: s.eripDialog.get('loading'),
        mts_session: s.eripDialog.get('mts_session'),
        fault: s.eripDialog.get('fault'),
        errors: s.eripDialog.get('errors'),
        success: s.eripDialog.get('success')
    })),
    {
        entitiesLoader: initDialog,
        requestInDialog
    }
)(PageDataLoader(PageLayout(Payments)));



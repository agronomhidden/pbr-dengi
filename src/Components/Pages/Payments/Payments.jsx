import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import PageLayout from '../../Decorators/PageLayout'
import {initDialog, requestInDialog} from '../../../Reducers/AC/eripDialogAC'
import PageDataLoader from '../../Decorators/PageDataLoader'
import {Roller} from "../../Loading"
import {setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import {setStateOfPropsForDialog} from "pbr-lib-front-utils/dist/MtsMoneyApi/dialogHelper"
import {DialogMap} from "./index"
import DialogFieldPreparer from "../../../Utils/DialogFieldPreparer"
import PageComponent from "../../App/PageComponent"

export class Payments extends PageComponent {

    state = {
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        const {entities, errors} = nextProps;

        entities && entities.forEach((record, i) => {
            this.props.entities.size !== entities.size && entities.size === ++i
            && this.setState(setStateOfPropsForDialog(record.get('fields').toObject()))
        })
        errors && this.setState({errors})
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    _onCheck = ({target: {name, checked}}) => {
        this.setState({[name]: Number(checked)})
    }

    _onSubmit = (e) => {
        e.preventDefault();
        const {mts_session, requestInDialog, entities, match: {params: {id}}} = this.props

        const prepareFields = new DialogFieldPreparer(this.state, entities);

        if (prepareFields.fieldError) {
            const {name, text} = prepareFields.fieldError
            this.setState(setFieldError(this.state, name, text))
            return
        }
        requestInDialog({
            id,
            mts_session,
            fields: prepareFields.originalFields,
            otherFields: prepareFields.otherFields
        })
    }

    _onInValid = (e) => {
        e.preventDefault()
        for (let {validationMessage, name} of e.target.form.elements) {
            validationMessage && this.setState(setFieldError(this.state, name, validationMessage))
        }
    }

    render = () =>
        <div>
            {this.props.uuid && <Redirect to={'/history-items/' + this.props.uuid}/>}
            <h3>Заголовок платежа</h3>
            {this.props.fault ?
                <h3 style={{backgroundColor: 'red'}}>{this.props.fault}</h3>
                :
                <form method="POST" onSubmit={this._onSubmit} onInvalid={this._onInValid}>
                    <DialogMap {...this.props} payState={this.state} onChange={this._onChange} onCheck={this._onCheck}/>
                    {this.props.loading ?
                        <Roller parentClass="form-group_field-loading" width={'15px'}/> :
                        !!this.props.entities.size && <button disabled={this.props.success}>Отправить</button>
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
        fault: s.eripDialog.get('fault'),
        errors: s.eripDialog.get('errors'),
        uuid: s.eripDialog.get('uuid')
    })),
    {
        entitiesLoader: initDialog,
        requestInDialog
    }
)(PageDataLoader(PageLayout(Payments)))





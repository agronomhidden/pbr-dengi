import React from 'react'
import {connect} from 'react-redux'
import PageLayout from '../../Decorators/PageLayout'
import {initDialog, requestInDialog} from '../../../Reducers/AC/eripDialogAC'
import PageDataLoader from '../../Decorators/PageDataLoader'
import {Roller} from "../../Loading"
import {setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import {DialogMap} from "./index"
import DialogFieldPreparer from "../../../Services/Dialog/DialogFieldPreparer"
import PageComponent from "../../App/PageComponent"
import DialogPrepareRenderFields from "../../../Services/Dialog/DialogPrepareRenderFields"
import DialogDefaultValueFactory from "../../../Services/Dialog/DialogDefaultValueFactory"

export class Payments extends PageComponent {

    constructor(props) {
        super(props);
        DialogDefaultValueFactory
            .setSearchString(props.history.location.search)
            .setServiceId(props.match.params.id);
    }

    state = {
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        const {entities, errors, favorite, invoice} = nextProps;

        favorite && DialogDefaultValueFactory.setFavoriteProps(favorite);

        invoice && DialogDefaultValueFactory.setInvoiceProps(invoice)

        const currentDialogEntities = entities.slice(this.props.entities.size);

        const prepareFields = new DialogPrepareRenderFields(currentDialogEntities, DialogDefaultValueFactory.valueContainer)

        this.setState(prepareFields.fieldsState);

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
    ({eripDialog, favorites, accounts}) => ({
        entities: eripDialog.get('dialogBlocks'),
        loading: eripDialog.get('loading'),
        mts_session: eripDialog.get('mts_session'),
        fault: eripDialog.get('fault'),
        errors: eripDialog.get('errors'),
        favorite: favorites.get('favorite'),
        invoice: accounts.get('invoiceUserData')
    }),
    {
        entitiesLoader: initDialog,
        requestInDialog,
    }
)(PageDataLoader(PageLayout(Payments)))





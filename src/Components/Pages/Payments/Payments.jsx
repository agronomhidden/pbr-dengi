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
import ContinueDialog from "./ContinueDialog"

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

    _onSubmit = () => {

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

    render = () => {
        return (
            <div>
                <h3>Заголовок платежа</h3>
                {this.props.fault ?
                    <h3 style={{backgroundColor: 'red'}}>{this.props.fault}</h3>
                    :
                    <form onInvalid={this._onInValid}>
                        <DialogMap {...this.props} payState={this.state} onChange={this._onChange}
                                   onCheck={this._onCheck}/>
                        <ContinueDialog showButt={!!this.props.entities.size} onSubmit={this._onSubmit}
                                        subscription={this.props.subscription} loading={this.props.loading}/>
                    </form>
                }
            </div>)
    }
}

export default connect(
    ({eripDialog, favorites, accounts}) => ({
        entities: eripDialog.get('dialogBlocks'),
        loading: eripDialog.get('loading'),
        mts_session: eripDialog.get('mts_session'),
        fault: eripDialog.get('fault'),
        errors: eripDialog.get('errors'),
        favorite: favorites.get('favorite'),
        invoice: accounts.get('invoiceUserData'),
        subscription: eripDialog.get('subscription')
    }),
    {
        entitiesLoader: initDialog,
        requestInDialog,
    }
)(PageDataLoader(PageLayout(Payments)))





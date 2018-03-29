import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import FormGroup from "../Partials/FormGroup"
import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"
import FieldsAttributesRecord from "../../../Reducers/Entities/FieldsAttributesRecord"
import {updateStateFromAssoc} from "pbr-lib-front-utils/dist/reactStateHelper"
import {setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import PageComponent from "../../App/PageComponent"
import TeaserRecord from "../../../Reducers/Entities/TeaserRecord"
import {MapFormGroup} from "../Partials"
import {recharge} from "../../../Reducers/AC/assistAC"


export class Recharge extends PageComponent {

    static propTypes = {
        fields: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        teaser: PropTypes.instanceOf(TeaserRecord),
        uuids: PropTypes.string.isRequired,
        errors: PropTypes.object,
    }

    state = {
        first_name: '',
        last_name: '',
        comment: '',
        email: '',
        sum: '',
        uuids: '',
        errors: {}
    }

    _onChange = ({target: {name, value}}) => {
        this.setState({[name]: value, errors: {}})
    }

    _onSubmit = (e) => {
        e.preventDefault()
        this.props.recharge(this.state)
    }

    _onInValid = (e) => {
        e.preventDefault()
        for (let {validationMessage, name} of e.target.form.elements) {
            validationMessage && this.setState(setFieldError(this.state, name, validationMessage))
        }
    }

    componentWillMount() {
        this.setState(Object.assign(
            updateStateFromAssoc(this.state, this.props.user),
            {'sum': this.props.teaser.Params.get('sum'), 'uuids': this.props.uuids}
        ))
    }

    componentWillReceiveProps(nextProps) {
        nextProps.errors && this.setState({errors: nextProps.errors})
    }

    teaser() {
        const {Text, Params, SuggestedSum, ValidSum} = this.props.teaser;
        let infoBlock;
        if (ValidSum) {
            infoBlock = SuggestedSum.reverse().map((value, i) => {
                value = value.toFixed(2)
                return <FormGroup key={i}
                                  name='sum'
                                  type='radio'
                                  label={value}
                                  value={value}
                                  checked={this.state.sum === value}
                                  onChange={this._onChange}/>
            })
        } else {
            infoBlock = <b>{` ${Params.get('sum')} ${Params.get('currency')}`}</b>
        }
        return <div className="teaser">{Text}{infoBlock}</div>

    }

    render() {
        return <div>
            <div style={{color:'red'}}>{this.props.servError}</div>
            <form onSubmit={this._onSubmit} onInvalid={this._onInValid}>
                <MapFormGroup fields={this.props.fields} state={this.state} onChange={this._onChange}/>
                {this.teaser()}
                <button disabled={this.props.loading}>Выполнить</button>
            </form>
        </div>
    }
}


export default connect(
    ({payInvoices, auth, assist}) => {

        return {
            fields: mapToArr(payInvoices.get('fields'), FieldsAttributesRecord),
            teaser: new TeaserRecord(payInvoices.get('teaser')),
            uuids: payInvoices.get('transactionUuids'),
            loading: assist.get('rechargeLoading'),
            user: auth.get('user'),
            errors: assist.get('fieldErrors'),
            servError: assist.get('error')
        }

    }, {recharge}
)(Recharge);
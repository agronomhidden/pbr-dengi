import React, {Component} from 'react';
import {connect} from "react-redux"

import PageLayout from "../../Decorators/PageLayout"
import FormGroup from "../Partials/FormGroup"

import PropTypes from 'prop-types';
import {mapToArr} from "pbr-lib-front-utils/dist/dateManipulation"
import FieldsAttributesRecord from "../../../Reducers/Entities/FieldsAttributesRecord"
import {updateStateFromAssoc} from "pbr-lib-front-utils/dist/reactStateHelper"
import {setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import PageComponent from "../../App/PageComponent"
import TeaserRecord from "../../../Reducers/Entities/TeaserRecord"
import {MapFormGroup} from "../Partials"
import {recharge} from "../../../Reducers/AC/assistAC"
import {Roller} from "../../Loading"


export class RechargeDialog extends PageComponent {


    static propTypes = {
        fields: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
        teaser: PropTypes.instanceOf(TeaserRecord),
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired
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
                const amount = i === 1 ? (+Params.get('sum') + value).toFixed(2) : Params.get('sum')
                return <FormGroup key={i}
                                  name='sum'
                                  type='radio'
                                  label={amount}
                                  value={amount}
                                  checked={this.state.sum === amount}
                                  onChange={this._onChange}/>
            })
        } else {
            infoBlock = <b>{` ${Params.get('sum')} ${Params.get('currency')}`}</b>
        }
        return <div className="teaser">{Text}{infoBlock}</div>

    }

    render() {
        return <div>{this.props.loaded ?
            <form onSubmit={this._onSubmit} onInvalid={this._onInValid}>
                <MapFormGroup fields={this.props.fields} state={this.state} onChange={this._onChange}/>
                {this.teaser()}
                <button>Выполнить</button>
            </form> :
            <Roller/>
        }</div>
    }
}


export default connect(
    ({assist, auth}) => ({
        fields: mapToArr(assist.get('fields'), FieldsAttributesRecord),
        user: auth.get('user'),
        teaser: new TeaserRecord(assist.get('teaser')),
        loading: assist.get('loading'),
        loaded: assist.get('loaded'),
        uuids: assist.get('uuids'),
        errors: assist.get('errors')
    }), {recharge}
)(PageLayout(RechargeDialog));
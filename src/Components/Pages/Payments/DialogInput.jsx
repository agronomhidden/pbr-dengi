import React, {Component} from 'react';
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import {SimpleDatePicker, Input, Checkbox} from "../Partials/index"
import classNames from "classnames"
import {getFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import moment from "moment"
import {changeEripDataFormat} from "../../../Utils/helper"


export default class DialogInput extends Component {

    static propTypes = {
        mask: PropTypes.object,
        hint: PropTypes.string,
        editable: PropTypes.bool
    };

    _getInputClasses() {
        const {inputModifier, name} = this.props;
        const inputClass = {
            'form-group_control': true,
            'danger': getFieldError(name, this.props)
        }
        inputClass[inputModifier] = !!inputModifier;
        return classNames(inputClass);
    }

    _getInput() {

        const {
            name, type, min, max, required, disabled, nominal, payState, placeholder, mask,
            value, hint, editable, format, onCheck, onChange
        } = this.props;

        if (!editable) {
            return <h3>{value}</h3>
        }

        let component;

        switch (type) {
            case 'R':
            case 'I':
                if (mask) {
                    component = <InputMask name={name} mask={mask.prefix + ' ' + mask.mask + ' ' + mask.postfix}
                                           value={payState[name]} maskChar={'*'} alwaysShowMask={true}
                                           required={required} disabled={disabled}
                                           onChange={onChange} className={this._getInputClasses()}/>
                    break
                }
                component = <Input name={name} type={'number'} min={min} max={max} step={nominal || min}
                                   value={payState[name]} placeholder={placeholder} required={required}
                                   disabled={disabled} onChange={onChange} className={this._getInputClasses()}/>
                break
            case 'S':
                component = <Input name={name} type={'text'} value={payState[name]} placeholder={placeholder}
                                   required={required} disabled={disabled} onChange={onChange}
                                   className={this._getInputClasses()}/>
                break
            case 'N':
                component = <InputMask name={name} mask={placeholder} value={payState[name]} maskChar={'*'}
                                       alwaysShowMask={true} required={required} disabled={disabled}
                                       onChange={onChange} className={this._getInputClasses()}/>
                break
            case 'D':
                component = <SimpleDatePicker name={name} required={required} format={format}
                                              onChange={onChange} className={this._getInputClasses()}
                                              value={moment(payState[name], format)}/>
                break
            case 'L':
                component = <Checkbox name={name} onChange={onCheck} checked={payState[name]} disabled={disabled}
                                      className={this._getInputClasses()}/>
                break
        }

        return <div>{component} {hint && hint}</div>
    }


    render = () => this._getInput()

}


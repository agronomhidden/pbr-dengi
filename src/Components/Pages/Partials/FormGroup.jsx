import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import classNames from 'classnames'
import {getFieldError} from '../../../Utils/helper'

export default class FormGroup extends Component {

    static propTypes = {
        /** Input */
        type: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        inputModifier: PropTypes.string,
        /** Mask*/
        mask: PropTypes.string,
        maskChar: PropTypes.string,
        alwaysShowMask: PropTypes.bool,
        /** Label */
        label: PropTypes.string,
        labelModifier: PropTypes.string,
        /** Wrapper */
        wrapperModifier: PropTypes.string,
        /** General */
        errors: PropTypes.object,
        isNotForm: PropTypes.bool,
    };

    getInput() {
        const {
            mask, name, value, onChange, placeholder, type = 'text',
            checked, disabled, isNotForm, inputModifier, maskChar, alwaysShowMask
        } = this.props;

        const inputClass = {
            'form-group_control': !isNotForm,
            'danger': getFieldError(name, this.props)
        };
        inputClass[inputModifier] = !!inputModifier;

        return mask ?
            <InputMask id={name}
                       mask={mask}
                       maskChar={maskChar}
                       alwaysShowMask={alwaysShowMask}
                       className={classNames(inputClass)}
                       name={name}
                       value={value}
                       disabled={disabled}
                       onChange={onChange}/>
            :
            <input id={name}
                   className={classNames(inputClass)}
                   name={name}
                   type={type}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   disabled={disabled}
                   checked={checked}/>
    }

    render() {
        const {name, label, wrapperModifier, labelModifier, isNotForm} = this.props;

        const errorText = getFieldError(name, this.props);

        const wrapperClass = {
            'form-group -form-simple': !isNotForm,
            '-has-error': !!errorText,
        };
        wrapperClass[wrapperModifier] = !!wrapperModifier;

        const labelClass = {
            'form-group_label': !isNotForm
        };
        labelClass[labelModifier] = !!labelModifier;

        return (
            <section className={classNames(wrapperClass)}>
                {label && <label htmlFor={name} className={classNames(labelClass)}>{label}</label>}
                {this.getInput()}
                {errorText && <div className="form-group_help">{errorText}</div>}
            </section>
        )
    }
}

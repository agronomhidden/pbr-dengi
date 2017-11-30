import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import classNames from 'classnames'
import {getFieldError} from '../../../Utils/helper'

export default class FormGroup extends Component {

    static propTypes = {
        type: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        modifier: PropTypes.string,
        labelModifier: PropTypes.string,
        placeholder: PropTypes.string,
        mask: PropTypes.string,
        onChange: PropTypes.func,
        checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        error: PropTypes.object,
        disabled: PropTypes.bool,
        isNotForm: PropTypes.bool,
        inputModifier: PropTypes.string
    };

    getInput() {
        const {mask, name, value, onChange, placeholder, type = 'text', checked, disabled, isNotForm, inputModifier} = this.props;
        const inputClass = {
            'form-group_control': !isNotForm,
            'danger': getFieldError(name, this.props)
        };
        inputClass[inputModifier] = !!inputModifier;

        return mask ?
            <InputMask id={name}
                       mask={mask}
                       className={classNames(inputClass)}
                       name={name}
                       type={type}
                       placeholder={placeholder || mask.replace(/\*/g, '*')}
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
        const {name, label, modifier, labelModifier, isNotForm} = this.props;
        const errorText = getFieldError(name, this.props);
        const formGroupClasses = {
            'form-group -form-simple': !isNotForm,
            '-has-error': !!errorText,
        };
        formGroupClasses[modifier] = !!modifier;

        const labelClass = {
            'form-group_label': true
        };
        labelClass[labelModifier] = !!labelModifier;
        return (
            <div className={classNames(formGroupClasses)}>
                <label htmlFor={name} className={classNames(labelClass)}>{label}</label>
                {this.getInput()}
                {errorText && <div className="form-group_help">{errorText}</div>}
            </div>
        );
    }
}

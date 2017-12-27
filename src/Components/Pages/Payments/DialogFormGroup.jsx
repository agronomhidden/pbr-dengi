import React, {Component} from 'react'
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask'
import classNames from 'classnames'
import {getFieldError} from '../../../Utils/helper'
import {Roller} from "../../Loading/Roller"
import DatePicker from 'react-date-picker'


export default class DialogFormGroup extends Component {

    static propTypes = {
        description: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        maxLength: PropTypes.number,
        minLength: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        hint: PropTypes.string,
        format: PropTypes.string,
        value: PropTypes.string,
        originalFields: PropTypes.string,
        isSum: PropTypes.bool.isRequired,
        nominal: PropTypes.string,
        mask: PropTypes.object,
        /**Внешние свойства*/
        onChange: PropTypes.func.isRequired,
        onCheck: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired
    }

    getInput() {
        const {
            mask, name, value, onChange, hint, type, maxLength, minLength,
            min, max, format, onCheck,
            checked, inputModifier,
        } = this.props;

        const inputClass = {
            'form-group_control': true,
            'danger': getFieldError(name, this.props)
        };
        inputClass[inputModifier] = !!inputModifier;

        if (mask) {
            return <InputMask id={name}
                              mask={mask.prefix + mask.mask + mask.postfix}
                              maskChar={'*'}
                              alwaysShowMask={true}
                              className={classNames(inputClass)}
                              name={name}
                              value={value}
                              onChange={onChange}/>
        } else {
            const attributes = {
                id: name,
                className: classNames(inputClass),
                name,
                min,
                max,
                maxLength,
                'data-minLength': minLength,
                value,
                onChange,
            }
            switch (type) {
                case 'R':
                case 'I':
                    attributes['type'] = 'number'
                    break
                case 'S':
                    attributes['type'] = 'text'
                    break
                case 'D':
                    attributes['type'] = 'date'
                    break
                case 'L':
                    attributes['type'] = 'checkbox'
                    attributes['onChange'] = onCheck
                    attributes['checked'] = checked
                    break
            }

            //return <DatePicker {...attributes} />

            return <span><input {...attributes}/>{hint && hint}</span>
        }
    }

    render() {
        const {name, description, wrapperModifier, labelModifier, loading} = this.props;

        const errorText = getFieldError(name, this.props);

        const wrapperClass = {
            'form-group': true,
            '-has-error': !!errorText,
        };
        wrapperClass[wrapperModifier] = !!wrapperModifier;

        const labelClass = {
            'form-group_label': true
        };
        labelClass[labelModifier] = !!labelModifier;

        const label = description ? description : name;

        return (
            <section className={classNames(wrapperClass)}>
                {label && <label htmlFor={name} className={classNames(labelClass)}>{label}</label>}
                {this.getInput()}
                {errorText && <div className="form-group_help">{errorText}</div>}
                {loading && <Roller parrentClass="form-group_field-loading" width={'15px'}/>}
            </section>
        )
    }
}





























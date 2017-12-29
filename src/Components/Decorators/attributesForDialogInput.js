import React, {Component} from 'react';
import classNames from "classnames"
import {getFieldError} from "../../Utils/helper"
import PropTypes from "prop-types"


export default (Component) => class attributesForDialogInput extends Component {


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
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        editValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        originalFields: PropTypes.string,
        isSum: PropTypes.bool,
        nominal: PropTypes.string,
        mask: PropTypes.object,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        /**Внешние свойства*/
        onChange: PropTypes.func.isRequired,
        onCheck: PropTypes.func.isRequired,
    }

    _getInputClasses() {
        const {inputModifier, name} = this.props;
        const inputClass = {
            'form-group_control': true,
            'danger': getFieldError(name, this.props)
        }
        inputClass[inputModifier] = !!inputModifier;

        return classNames(inputClass);
    }

    _getAttributes() {

        const {
            name, onChange, type, maxLength, minLength,
            min, max, onCheck, required, checked,
            editValue,
        } = this.props;

        let attributes = {
            id: name,
            name,
            min,
            max,
            maxLength,
            'data-minlength': minLength,
            value: editValue,
            step: min,
            required,
            onChange,
            className: this._getInputClasses(),
        }

        switch (type) {
            case 'R':
            case 'I':
                attributes['type'] = 'number'
                break
            case 'S':
                attributes['type'] = 'text'
                break
            case 'N':
                attributes['type'] = 'mask'
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

        return attributes;

    }

    _getMaskAttributes() {

        const {name, onChange, required, mask, placeholder, value} = this.props;

        return {
            type: 'mask',
            id: name,
            mask: mask ? (mask.prefix + mask.mask + mask.postfix) : placeholder,
            maskChar: '*',
            alwaysShowMask: true,
            className: this._getInputClasses(),
            name,
            value,
            required,
            onChange
        }
    }


    render = () => <Component attributes={this._getAttributes()}
                              maskAttributes={this._getMaskAttributes()}
                              {...this.props}/>

}

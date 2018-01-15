import React, {Component} from 'react';
import classNames from "classnames"
import {getFieldError, setFieldError} from "pbr-lib-front-utils/dist/MtsMoneyApi/formatHelper"
import PropTypes from "prop-types"


export default (Component) => class attributesForDialogInput extends Component {


    static propTypes = {
        description: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
        required: PropTypes.bool,
        hint: PropTypes.string,
        format: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        editValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        originalFields: PropTypes.string,
        isSum: PropTypes.bool,
        mask: PropTypes.object,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool.isRequired,
        checked: PropTypes.number,
        /**Внешние свойства*/
        onChange: PropTypes.func.isRequired,
        onCheck: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
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

        const {name, onChange, type, min, max, onCheck, required, checked, editValue, disabled} = this.props;

        let attributes = {
            id: name,
            name,
            min,
            max,
            value: editValue,
            step: min,
            required,
            onChange,
            disabled,
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

        const {name, onChange, mask, placeholder, editValue, disabled} = this.props;

        return {
            type: 'mask',
            id: name,
            mask: mask ? (mask.prefix + ' ' + mask.mask + ' ' + mask.postfix) : placeholder,
            maskChar: '*',
            alwaysShowMask: true,
            className: this._getInputClasses(),
            name,
            disabled,
            value: editValue,
            onChange
        }
    }


    render = () => <Component attributes={this._getAttributes()}
                              maskAttributes={this._getMaskAttributes()}
                              {...this.props}/>

}

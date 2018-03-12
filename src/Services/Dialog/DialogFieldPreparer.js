import {prepareOriginFieldPhone} from "../../Utils/helper"

export default class DialogFieldPreparer {

    originalFields = {};

    otherFields = {};

    values;

    fields;

    fieldError;

    constructor(state, entities) {
        this.values = state
        this.fields = entities
        if (this.removeErrors()) {
            this.prepared()
        }
    }

    isObject(props) {
        return props instanceof Object
    }

    setFields(name, {originalField, mask}) {
        if (originalField) {
            this.originalFields[name] = this.getFieldValue(mask, this.values[name])
        } else {
            this.otherFields[name] = this.getFieldValue(mask, this.values[name])
        }
    }

    getFieldValue(mask, fieldValue) {
        return mask ? prepareOriginFieldPhone(fieldValue, mask.prefix) : fieldValue
    }

    getFieldsLength() {
        return this.fields.size
    }

    removeErrors() {
        return this.isObject(this.values) && delete this.values.errors
    }

    prepared() {
        for (let name in this.values) {
            const fieldProps = this.getFieldProps(name)
            if (fieldProps && this.validateLengthString(name, fieldProps)) {
                this.setFields(name, fieldProps)
            }
        }
    }

    getFieldProps(name) {
        if (this.isObject(this.fields)) {
            let i = 1
            for (let record of this.fields) {
                if (i++ === this.getFieldsLength()) {
                    return record.get('fields').get(name)
                }
            }
        }
        return false
    }
    /**  Вынести в  библиотеку */
    trim(str) {
        return str && str.replace(/\s*/g, '') || ''
    }

    validateLengthString(name, {minLength, maxLength}) {
        let text = '';
        const value = this.trim(this.values[name])
        if (minLength && value.length < minLength) {
            text = `длина значения поля должна быть не менее ${minLength}`
        }

        if (maxLength && value.length > maxLength) {
            text = `длина значения поля должна быть не более ${maxLength}`
        }
        if (text) {
            this.fieldError = {name, text}
            return false
        }
        return true
    }
}



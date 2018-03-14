import {prepareOriginFieldPhone} from '../../Utils/helper';
import {trim} from '../../Utils/helper';
import {Map} from 'immutable';

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
        const fieldsValue = this.getFieldValue(mask, this.values[name]);
        if (originalField) {
            this.originalFields[name] = fieldsValue;
        } else {
            this.otherFields[name] = fieldsValue;
        }
    }

    getFieldValue(mask, fieldValue) {
        return mask ? prepareOriginFieldPhone(fieldValue, mask.prefix) : fieldValue
    }

    get fieldsLength() {
        if(Map.isMap){
            return this.fields.size
        }
        return 0;
    }

    removeErrors() {
        return this.isObject(this.values) && delete this.values.errors
    }

    prepared() {
        if(this.isObject(this.values)) {
            for (let name in this.values) {
                const fieldProps = this.getFieldProps(name)
                if (fieldProps && this.validateLengthString(name, fieldProps)) {
                    this.setFields(name, fieldProps)
                }
            }
        }
    }

    getFieldProps(name) {
        if (this.isObject(this.fields)) {
            let i = 1
            for (let record of this.fields) {
                if (i++ === this.fieldsLength) {
                    return record.get('fields').get(name)
                }
            }
        }
        return false
    }

    validateLengthString(name, {minLength, maxLength}) {

        if (this.values[name] instanceof String) {
            let text = '';

            const value = trim(this.values[name])

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
        }
        return true
    }
}



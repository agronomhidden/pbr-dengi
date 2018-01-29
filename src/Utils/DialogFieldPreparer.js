import {prepareOriginFieldPhone} from "./helper"

export default class DialogFieldPreparer {

    /** @var {{}} preparedFields **/
    preparedFields = {};
    /** @var {{}} values **/
    values;
    /** @var {{}} fields **/
    fields;
    /** @var {{}}  fieldError **/
    fieldError;

    constructor(state, entities) {
        this.values = state
        this.fields = entities
        if(this.removeErrors()){
            this.prepared()
        }
    }

    isObject = (props) => props instanceof Object

    getFields = () => this.preparedFields

    getError = () => this.fieldError

    getFieldKey = (originalField, name) => originalField ? `fields[${name}]` : name;

    getFieldValue = (mask, fieldValue) => mask ? prepareOriginFieldPhone(fieldValue, mask.prefix) : fieldValue

    getFieldsLength = () => this.fields.size

    removeErrors = () => this.isObject(this.values) && delete this.values.errors

    prepared() {
        for (let name in this.values) {
            const fieldProps = this.getFieldProps(name)
            if (fieldProps && this.validateLengthString(name, fieldProps)) {
                const {originalField, mask} = fieldProps
                this.preparedFields[this.getFieldKey(originalField,name)] = this.getFieldValue(mask, this.values[name])
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

    validateLengthString(name, {minLength, maxLength}) {
        let text = '';
        if (minLength && this.values[name].length < minLength) {
            text = `длина значения поля должна быть не менее ${minLength}`
        }
        if (maxLength && this.values[name].length > maxLength) {
            text = `длина значения поля должна быть не более ${maxLength}`
        }
        if (text) {
            this.fieldError = {name, text}
            return false
        }
        return true
    }

}



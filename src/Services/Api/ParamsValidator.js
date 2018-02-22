import is from 'is_js'

export default class ParamsValidator {
    static isInt(value) {
        return !isNaN(value) && parseInt(value) == value;
    }

    static isNull(value) {
        return is['null'](value);
    }
}
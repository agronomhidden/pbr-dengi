import is from 'is_js'

export default class ParamsValidator {
    static isInt(value) {
        return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
    }

    static isNull(value) {
        return is['null'](value);
    }
}
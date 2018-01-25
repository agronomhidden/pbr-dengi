import qs from "qs"

export function prepareParams(params) {

    let queryObject = {}
    for (let key in params) {
        params[key] = params[key] ? decodeURIComponent(params[key]) : params[key]
        if (key === '0') {
            queryObject = qs.parse(params[key], {ignoreQueryPrefix: true}) || {}
        }
    }
    return Object.assign(params, queryObject)
}

/**
 * Устанавливает state из props
 * @param props
 * @param state
 * @return object
 */
export function setState(props, state) {
    for (let key in state) {
        if (props[key]) {
            state[key] = props[key]
        }
    }
    return state;
}

/**
 * Устанавливает состояние для редактируемых полей.
 * @param props
 * @return {{}}
 */
export function setStateOfPropsForDialog(props) {
    const state = {};
    for (let name in props) {
        if (props[name].editable) {
            let value = props[name].value !== null ? props[name].value : ''
            state[name] = value
        }
    }
    return state;
}

/**
 * Подготавливает поля диалог к отправке на сервер
 * @param fieldState
 * @param entities
 * @return {*}
 */
export function prepareRequestDialogFields(fieldState, entities) {


    let preparedParams = {}

    fieldState instanceof Object && delete fieldState.errors

    for (let name in fieldState) {
        let fieldProps = {}

        if (entities instanceof Object) {
            for (let record of entities) {
                if (fieldProps = record.get('fields').get(name)) {
                    break
                }
            }
        }

        if (Object.keys(fieldProps).length !== 0) {
            let fieldValue = fieldState[name]
            const {originalField, mask} = fieldProps
            const validate = validateLengthString(fieldValue, name, fieldProps)

            if (!!validate) {
                return validate
            }

            if (originalField) {
                preparedParams[`fields[${name}]`] = mask ? prepareOriginFieldPhone(fieldValue, mask.prefix) : fieldValue
            } else {
                preparedParams[name] = fieldValue
            }
        }
    }

    return preparedParams
}

/**
 * Валидирование количества символов с строке
 * @param fieldValue
 * @param name
 * @param minLength
 * @param maxLength
 * @return {*}
 */
export function validateLengthString(fieldValue, name, {minLength, maxLength}) {
    let text = '';
    if (minLength && fieldValue.length < minLength) {
        text = `длина значения поля должна быть не менеее ${minLength}`
    }
    if (maxLength && fieldValue.length > maxLength) {
        text = `длина значения поля должна быть не более ${maxLength}`
    }
    if (text) {
        return {error: {name, text}}
    }
    return false
}

/**
 * удаляет префикс для eRip
 * @param phone string
 * @param prefix string
 */
export function prepareOriginFieldPhone(phone, prefix) {
    return phone.substr(prefix.length).replace(new RegExp('[^0-9]', 'g'), '')
}

/**
 * редактирует формат даты из ерип
 * @param format string
 */
export function changeEripDataFormat(format) {
    return format.replace(/YYYY/, 'yy').replace(/YY/, 'y').replace(/MM/, 'mm').replace(/DD/, 'dd')
}

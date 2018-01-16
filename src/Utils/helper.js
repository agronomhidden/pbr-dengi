import qs from "qs"

export function prepareParams(params) {

    let queryObject = {}
    for (let key in params) {
        params[key] = params[key] ? decodeURIComponent(params[key]) : params[key]
        if (key === '0') {
            queryObject = qs.parse(params[key], {ignoreQueryPrefix: true}) || {}
        }
    }
    return Object.assign(params, queryObject);
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
            state[key] = props[key];
        }
    }
    return state;
}

export function setStateOfPropsForDialog(props, key) {
    const state = {};
    for (let prop of props) {
        const value = prop.value || '';
        if (prop.editable) {
            state[prop[key]] = value
        }
        if (prop.type === "D") {
            state[prop[key]] = !prop.value ? new Date() : new Date(`20${prop.value.substring(2, 4)}`, prop.value.substring(0, 2), 0)
        }
    }
    return state;
}

export function prepareOriginFieldPhone(phone, prefix) {
    return phone.substr(prefix.length).replace(new RegExp('[^0-9]', 'g'), '')
}


export function setSearchValue(state, key) {
    return state[key] ? state[key] : '';
}

export function prepareRequestDialogFields(state) {
    const requestObject = {}
    for (let name in state) {
        if (name === 'sum') {
            requestObject[name] = state[name]
        } else {
            requestObject['fields[' + name + ']'] = state[name]
        }

    }
    return requestObject;
}

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

export function setStateOfProps(props, key) {
    const state = {};
    for (let i in props) {
        const value = props[i].value || '';
        if (props[i].editable) {
            console.log('state:', props[i][key], 'value:', value);
            state[props[i][key]] = value
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

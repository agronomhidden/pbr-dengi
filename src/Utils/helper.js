import {OrderedMap} from 'immutable'
import parse from 'url-parse'

import clone from 'clone';
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

export function formatPhone(phone) {
    if (phone.length !== 12) {
        return phone
    }
    return '+' + phone.slice(0, 3) + ' (' + phone.slice(3, 5) + ')-' + phone.slice(-7, -4) + '-' + phone.slice(-4)
}
/** @deprecated */
export function getFieldError(field, props) {
    return props.error && props.error.fields ? props.error.fields[field] : null
}


export function stateToQueryString(state = {}) {
    let queryStringArr = {};
    for (let key in state) {
        if (state[key]) {
            queryStringArr[key] = state[key];
            if (state[key] instanceof Array && !!state[key].length) {
                queryStringArr[key] = state[key].join(',');
            }
        }
    }
    return qs.stringify(queryStringArr);
}

export function queryStringToState(location = null) {
    return qs.parse(location && location.search, {ignoreQueryPrefix: true}) || {}
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

// export const setQueryStringToRoute = (routes, reqUrl) => {
//
//     const changeRouter = clone(routes);
//     const url = parse(reqUrl);
//     const searchInRout = '(/?)?';
//
//     return changeRouter.map(route => {
//
//         const {path} = route;
//         if (path.includes(searchInRout)) {
//             route.path = path.replace(searchInRout, '');
//             if (url.query && (route.path === url.pathname)) {
//                 route.path += '/:searchParams';
//             }
//         }
//         return route;
//     })
// }
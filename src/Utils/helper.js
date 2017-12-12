import {OrderedMap, Map} from 'immutable'
import parse from 'url-parse'
import qs from 'qs';
import clone from 'clone';


export function arrToMap(arr) {
    return arr.reduce((acc, item) =>
            acc.set(item.id, item)
        , new OrderedMap({}))
}

export function mapToArr(obj, DataRecord) {
    return obj.valueSeq().toArray().map((value) => new DataRecord(value));
}


export function prepareParams(params) {

    for (let i in params) {
        params[i] = params[i] ? decodeURIComponent(params[i]) : params[i];
        if (params[i].includes('?')) {
            params[i] = params[i].substr(0, params[i].indexOf('?'));
        }
    }
    return params;
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
            if (typeof state[key] === "number") {
                state[key] = Number(props[key]);
            }
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

export function getFieldError(field, props) {
    return props.error && props.error.fields ? props.error.fields[field] : null
}

export function setFieldError(props, field, text) {
    !props.errors && (props.errors = {fields: {[field]: text}});
    !props.errors.fields && (props.errors.fields = {[field]: text});
    !props.errors.fields[field] && (props.errors.fields[field] = text);
    return props;
}

export const setQueryStringToRoute = (routes, reqUrl) => {

    const changeRouter = clone(routes);
    const url = parse(reqUrl);
    let paramsToRouter = '';
    if (url.query) {
        const queryObject = qs.parse(url.query, {ignoreQueryPrefix: true});
        for (let key in queryObject) {
            queryObject[key] = queryObject[key] && `:${key}`
        }
        paramsToRouter = qs.stringify(queryObject, {encode: false, addQueryPrefix: true, skipNulls: true})
    }
    return changeRouter.map(route => {
        if (paramsToRouter && route.path === url.pathname) {
            route.path += paramsToRouter;
        }
        return route;
    })
}

export function queryStringToState() {
    return qs.parse(location.search, {ignoreQueryPrefix: true}) || {}
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

export function setSearchValue(state, key) {
    return (state[key] && state[key]) || '';
}
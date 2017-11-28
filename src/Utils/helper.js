import {OrderedMap, Map} from 'immutable'

export function arrToMap(arr) {
    return arr.reduce((acc, item) =>
            acc.set(item.id, item)
        , new OrderedMap({}))
}

export function mapToArr(obj, DataRecord) {
    return obj.valueSeq().toArray().map((value) => new DataRecord(value));
}


export function prepareParams(params) {
    let url = params[0];
    delete params[0];
    for (let i in params) {
        params[i] = params[i] ? decodeURIComponent(params[i]) : params[i];
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
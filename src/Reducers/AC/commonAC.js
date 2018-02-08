import {ERROR,SEARCH_EVENT} from "../../CONSTANTS"


export const setErrors = response => ({
    type: ERROR,
    payload: {fields: response.result, msg: response.message},
})

export const search = data => ({
    type: SEARCH_EVENT,
    payload: data,
    toQueryString: true,
})
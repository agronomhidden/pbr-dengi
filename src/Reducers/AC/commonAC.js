import {ERROR, SEARCH_EVENT} from "../../CONSTANTS"

export const setErrors = response => ({
    type: ERROR,
    payload: response
})

export const search = data => ({
    type: SEARCH_EVENT,
    payload: data,
    toQueryString: true,
})
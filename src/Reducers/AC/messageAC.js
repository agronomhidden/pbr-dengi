import {SET_MESSAGE, SUCCESS, START} from "../../CONSTANTS"

export const loadMessage = () => ({
    type: SET_MESSAGE + START
})

export const setMessage = response => ({
    type: SET_MESSAGE + SUCCESS,
    payload: response,
})
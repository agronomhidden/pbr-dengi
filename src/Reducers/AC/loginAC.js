import {SET_CURRENT_USER, SUCCESS, START, FAIL, LOGOUT_CURRENT_USER} from "../../CONSTANTS"

export const loginCurrentUser = () => ({
    type: SET_CURRENT_USER + START
})

export const setCurrentUser = response => ({
    type: SET_CURRENT_USER + SUCCESS,
    payload: response,
})

export const setLoginErrors = response => ({
    type: SET_CURRENT_USER + FAIL,
    payload: {fields: response.result, msg: response.message},
})

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

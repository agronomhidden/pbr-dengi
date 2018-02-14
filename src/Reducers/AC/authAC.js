import {SET_CURRENT_USER, SUCCESS, START, LOGOUT_CURRENT_USER} from "../../CONSTANTS"

export const loginCurrentUser = () => ({
    type: SET_CURRENT_USER + START
})

export const setCurrentUser = response => ({
    type: SET_CURRENT_USER + SUCCESS,
    payload: response
})

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

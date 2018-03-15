import {SET_CURRENT_USER, SUCCESS, START, LOGOUT_CURRENT_USER, FAIL, API_REQUEST_ACTION, LOGIN_USER} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages";

export const setCurrentUser = response => ({
    type: SET_CURRENT_USER,
    payload: response
})

export const loginUserStart = () => ({
    type: LOGIN_USER + START
})

export const loginUserSuccess = response => ({
    type: LOGIN_USER + SUCCESS,
    payload: response
})

export const loginUserFail = response => ({
    type: LOGIN_USER + FAIL,
    payload: {fields: response.result, msg: response.message}
})

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

export const getUserByToken = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetUser.METHOD,
    payload: {},
    successAC: setCurrentUser,
    forbiddenErrorAC: logoutCurrentUser
})

export const userLogin = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageLoginUser.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => loginUserStart(),
    successAC: loginUserSuccess,
    fieldErrorAC: loginUserFail
})
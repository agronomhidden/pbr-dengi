import {
    SET_CURRENT_USER, LOGOUT_CURRENT_USER, LOGIN_USER, GET_BALANCE,
    API_REQUEST_ACTION, SET_USER_DEVICE, CLOSED_TEASER, SEND_CODE,
    SUCCESS, START, FAIL
} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages";

export const setCurrentUser = response => ({
    type: SET_CURRENT_USER,
    payload: response
})

export const getUserByToken = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetUser.METHOD,
    successAC: setCurrentUser,
    serverErrorAC: loginUserFail,
    forbiddenErrorAC: logoutCurrentUser
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

export const userLogin = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageLoginUser.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => loginUserStart(),
    successAC: loginUserSuccess,
    fieldErrorAC: loginUserFail
})

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

export const getBalanceStart = () => ({
    type: GET_BALANCE + START
})

export const getBalanceSuccess = response => ({
    type: GET_BALANCE + SUCCESS,
    payload: response
})

export const getBalanceFail = ({message, error}, defaultError = 'Ошибка получения данных') => ({
    type: GET_BALANCE + FAIL,
    payload: message || error || defaultError
})

export const getBalance = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetBalance.METHOD,
    beforeAC: (paramsContainer) => getBalanceStart(),
    successAC: getBalanceSuccess,
    forbiddenErrorAC: logoutCurrentUser,
    serverErrorAC: getBalanceFail
})

export const sendCodeInit = () => ({
    type: SEND_CODE + START
})

export const sendCodeComplete = response => ({
    type: SEND_CODE + SUCCESS,
    payload: response
})

export const sendCodeFail = response => ({
    type: SEND_CODE + FAIL,
    payload: {fields: response.result, msg: response.message}
})

export const sendCode = phone => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageSendPassword.METHOD,
    payload: {phone},
    beforeAC: (paramsContainer) => sendCodeInit(),
    successAC: sendCodeComplete,
    fieldErrorAC: sendCodeFail
})

export const setUserDevice = device => ({
    type: SET_USER_DEVICE,
    payload: device
})

export const setClosedTeaser = device => ({
    type: CLOSED_TEASER,
    payload: device
})

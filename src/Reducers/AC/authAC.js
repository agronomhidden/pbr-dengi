import {
    SET_CURRENT_USER, LOGOUT_CURRENT_USER, LOGIN_USER, GET_BALANCE,
    API_REQUEST_ACTION,
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
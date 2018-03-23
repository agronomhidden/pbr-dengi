import {
    GET_RECHARGE_REQUIREMENT,
    RECHARGE,
    RECHARGE_INFO,
    SET_ASSIST_PARAMS,
    SUCCESS,
    START,
    FAIL,
    API_REQUEST_ACTION
} from "../../CONSTANTS"

import * as creator from "../../Services/Api/Messages/messagesClassStorage";
import {logoutCurrentUser} from "./authAC"

export const rechargeRequirementStart = () => ({
    type: GET_RECHARGE_REQUIREMENT + START,
})

export const rechargeRequirementLoaded = response => ({
    type: GET_RECHARGE_REQUIREMENT + SUCCESS,
    payload: response
})

export const setRechargeError = response => ({
    type: RECHARGE + FAIL,
    payload: {fields: response.result, msg: response.message}
})


export const getRechargeRequirement = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetRequirement.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => rechargeRequirementStart(),
    successAC: rechargeRequirementLoaded,
    forbiddenErrorAC: logoutCurrentUser,
    dataLoadErrorAC: setRechargeError,
    serverErrorAC: setRechargeError
})


export const rechargeStart = () => ({
    type: RECHARGE + START,
})

export const rechargeSetAssistParams = response => ({
    type: SET_ASSIST_PARAMS,
    payload: response
})

export const getRechargeInfoStart = (status, orderNumber) => ({
    type: RECHARGE_INFO + START,
    status,
    orderNumber
})

export const getRechargeInfoSuccess = response => ({
    type: RECHARGE_INFO + SUCCESS,
    payload: response
})

export const getRechargeInfoFail = response => ({
    type: RECHARGE_INFO + FAIL
})


export const recharge = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageRecharge.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => rechargeStart(),
    successAC: rechargeSetAssistParams,
    forbiddenErrorAC: logoutCurrentUser,
    fieldErrorAC: setRechargeError,
    dataLoadErrorAC: setRechargeError,
    serverErrorAC: setRechargeError
})

export const getRechargeInfo = (params, status = true) => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageRechargeInfo.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => getRechargeInfoStart(status, params.ordernumber),
    successAC: getRechargeInfoSuccess,
    forbiddenErrorAC: logoutCurrentUser,
    dataLoadErrorAC: getRechargeInfoFail,
    serverErrorAC: setRechargeError
})




import {
    CHANGE_PASSWORD, SET_PROFILE, TOTAL_LOGOUT, DELETE_SUBSCRIPTION, START, SUCCESS, FAIL, USER_AGREEMENT,
    API_REQUEST_ACTION, SETTINGS_FIELDS_ERROR ,SETTINGS_DISTRIBUTOR
} from "../../CONSTANTS"
import * as msg from "../../Services/Api/Messages"
import {logoutCurrentUser} from "./authAC"

export const changePasswordStart = () => ({
    type: CHANGE_PASSWORD + START
})

export const changePasswordSuccess = () => ({
    type: CHANGE_PASSWORD + SUCCESS,
})

export const setFieldsError = response => ({
    type: SETTINGS_FIELDS_ERROR,
    payload: {fields: response.result, msg: response.message}
})

export const changePassword = data => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageChangePassword.METHOD,
    payload: data,
    beforeAC: (paramsContainer) => changePasswordStart(),
    successAC: changePasswordSuccess,
    fieldErrorAC: setFieldsError,
    forbiddenErrorAC: logoutCurrentUser
})

export const setProfileStart = () => ({
    type: SET_PROFILE + START
})

export const setProfileSuccess = () => ({
    type: SET_PROFILE + SUCCESS
})

export const setProfile = data => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageSetProfile.METHOD,
    payload: data,
    beforeAC: (paramsContainer) => setProfileStart(),
    successAC: setProfileSuccess,
    fieldErrorAC: setFieldsError,
    forbiddenErrorAC: logoutCurrentUser
})

export const getAgreementStart = () => ({
    type: USER_AGREEMENT + START,
})

export const getAgreementSuccess = response => ({
    type: USER_AGREEMENT + SUCCESS,
    payload: response
})

export const getUserAgreement = () => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageUserAgreement.METHOD,
    payload: {},
    beforeAC: (paramsContainer) => getAgreementStart(),
    successAC: getAgreementSuccess,
})

export const totalLogoutStart = () => ({
    type: TOTAL_LOGOUT + START
})

export const totalLogoutSuccess = () => ({
    type: TOTAL_LOGOUT + SUCCESS,
})

export const totalLogoutFail = () => ({
    type: TOTAL_LOGOUT + FAIL
})

export const totalLogoutDistributor = response => ({
    type: SETTINGS_DISTRIBUTOR,
    payload: response,
    successAC: totalLogoutSuccess,
    failAC:  totalLogoutFail,
    logoutAC : logoutCurrentUser
})

export const totalLogout = () => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageTotalLogout.METHOD,
    beforeAC: (paramsContainer) => totalLogoutStart(),
    successAC: totalLogoutDistributor,
    forbiddenErrorAC: logoutCurrentUser
})

export const delSubscriptionStart = () => ({
    type: DELETE_SUBSCRIPTION + START
})

export const delSubscriptionSuccess = () => ({
    type: DELETE_SUBSCRIPTION + SUCCESS,
})

export const delSubscriptionFail = () => ({
    type: DELETE_SUBSCRIPTION + FAIL,
})

export const delSubsDistributor = res => ({
    type: SETTINGS_DISTRIBUTOR,
    payload: res,
    successAC: delSubscriptionSuccess,
    failAC:  delSubscriptionFail
})

export const delSubscription = () => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageDelSubscription.METHOD,
    beforeAC: (paramsContainer) => delSubscriptionStart(),
    successAC: delSubsDistributor,
    forbiddenErrorAC: logoutCurrentUser
})

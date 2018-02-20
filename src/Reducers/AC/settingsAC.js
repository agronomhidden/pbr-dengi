import {
    CHANGE_PASSWORD, SET_PROFILE,TOTAL_LOGOUT, DELETE_SUBSCRIPTION, START, SUCCESS, FAIL, USER_AGREEMENT
} from "../../CONSTANTS"

export const changePasswordStart = () => ({
    type: CHANGE_PASSWORD + START
})

export const changePasswordSuccess = () => ({
    type: CHANGE_PASSWORD + SUCCESS,
})

export const setFieldsdError = response => ({
    type: CHANGE_PASSWORD + FAIL,
    payload: {fields: response.result, msg: response.message}
})

export const setProfileStart = () => ({
    type: SET_PROFILE + START
})

export const setProfileSuccess = () => ({
    type: SET_PROFILE + SUCCESS,
})

export const getAgreementStart = () => ({
    type: USER_AGREEMENT + SUCCESS,
})

export const getAgreementSuccess = response => ({
    type: USER_AGREEMENT + SUCCESS,
    payload: response
})

export const totalLogoutStart = () => ({
    type: TOTAL_LOGOUT + START
})

export const totalLogoutSuccess = () => ({
    type: TOTAL_LOGOUT + SUCCESS,
})

export const totalLogoutFail = () => ({
    type: TOTAL_LOGOUT + FAIL,
})

export const delSubscriptionStart = () => ({
    type: DELETE_SUBSCRIPTION + START
})

export const delSubscriptionSuccess = response => ({
    type: DELETE_SUBSCRIPTION + SUCCESS,
})

export const delSubscriptionFail = () => ({
    type: DELETE_SUBSCRIPTION + FAIL,
})
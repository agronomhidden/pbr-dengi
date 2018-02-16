import {
    CHANGE_PASSWORD, SET_PROFILE, SET_RULES, TOTAL_LOGOUT, DELETE_SUBSCRIPTION, START, SUCCESS, FAIL
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

export const setProfileFail = response => ({
    type: SET_PROFILE + FAIL,
    payload: {fields: response.result, msg: response.message}
})

export const setRules = response => ({
    type: SET_RULES + SUCCESS,
    payload: response
})

export const totalLogoutStart = () => ({
    type: TOTAL_LOGOUT + START
})

export const totalLogoutSuccess = response => ({
    type: TOTAL_LOGOUT + SUCCESS,
})

export const delSubscriptionStart = () => ({
    type: DELETE_SUBSCRIPTION + START
})

export const delSubscriptionSuccess = response => ({
    type: DELETE_SUBSCRIPTION + SUCCESS,
})
import {
    changePasswordStart,
    changePasswordSuccess,
    setProfileStart,
    setProfileSuccess,
    setFieldsdError,
    getAgreementStart,
    getAgreementSuccess,
    totalLogoutStart,
    totalLogoutSuccess,
    totalLogoutFail,
    delSubscriptionFail,
    delSubscriptionStart,
    delSubscriptionSuccess
} from "../AC/settingsAC"
import {logoutCurrentUser} from "..//AC/authAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"
import ErrorHandler from "../../Utils/ErrorHandler"
import {getUserByToken} from "./authRequest"

export const changePassword = data => dispatch => {

    dispatch(changePasswordStart())

    ErrorHandler.setFieldsErrorHandler(setFieldsdError)

    return MtsMoneyRequest
        .setMethod('user/change-password')
        .setParams(data)
        .postRequest()
        .then(res => res && res.data && dispatch(changePasswordSuccess()))
}


export const setProfile = data => dispatch => {

    dispatch(setProfileStart())

    ErrorHandler.setFieldsErrorHandler(setFieldsdError)

    return MtsMoneyRequest
        .setMethod('user/set-profile')
        .setParams(data)
        .postRequest()
        .then(res => res && res.data && dispatch(setProfileSuccess()) && dispatch(getUserByToken()))
}

export const getUserAgreement = () => dispatch => {

    dispatch(getAgreementStart())

    return MtsMoneyRequest
        .setMethod('help/user-agreement')
        .postRequest()
        .then(res => res && res.data && dispatch(getAgreementSuccess(res.data.result)))
}

export const totalLogout = () => dispatch => {

    dispatch(totalLogoutStart())

    return MtsMoneyRequest
        .setMethod('user/total-logout')
        .postRequest()
        .then(res => {
            if (res && res.data) {
                if (res.data.result.value) {
                    dispatch(logoutCurrentUser())
                    dispatch(totalLogoutSuccess())
                } else {
                    dispatch(totalLogoutFail())
                }
            }
        })
}

export const delSubscription = () => dispatch => {

    dispatch(delSubscriptionStart())

    return MtsMoneyRequest
        .setMethod('user/del-subscription')
        .postRequest()
        .then(res => {
            res && res.data && dispatch(res.data.result.value && delSubscriptionSuccess() || delSubscriptionFail())

        })
}
import {
    changePasswordStart,
    changePasswordSuccess,
    setProfileStart,
    setProfileSuccess,
    setFieldsdError
} from "../AC/settingsAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"
import ErrorHandler from "../../Utils/ErrorHandler"

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
        .then(res => res && res.data && dispatch(setProfileSuccess()))
}
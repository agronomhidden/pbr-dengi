import {setCurrentUser, loginCurrentUser, loginCurrentUserFail} from "../AC/authAC"
import {TOKEN} from '../../CONSTANTS';
import cookies from 'js-cookie';
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"
import ErrorHandler from "../../Utils/ErrorHandler"


export const getUserByToken = () => dispatch => {
    dispatch(loginCurrentUser())

    return MtsMoneyRequest
        .setMethod('user/get')
        .postRequest()
        .then(res => res && res.data && dispatch(setCurrentUser(res.data.result)))
}

export const userLogin = params => dispatch => {

    ErrorHandler.setFieldsErrorHandler(loginCurrentUserFail)

    return MtsMoneyRequest
        .setMethod('user/login')
        .setParams(params)
        .withLocation()
        .postRequest()
        .then(res => {
            if (res && res.data) {
                dispatch(setCurrentUser(res.data.result.user))
                cookies.set(TOKEN, res.data.result.authKey, {expires: 1});
            }
        })
}

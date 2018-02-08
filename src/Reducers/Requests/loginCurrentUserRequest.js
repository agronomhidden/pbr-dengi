import {setCurrentUser, loginCurrentUser, logoutCurrentUser} from "../AC/loginAC"
import {TOKEN} from '../../CONSTANTS';
import cookies from 'js-cookie';
import AdminMoneyRequest from "../../Utils/RequestApi/AdminMoneyRequest"
import ErrorHandler from "../../Utils/ErrorHandler"
import qs from "qs"


export const getUserByToken = () => dispatch => {

    dispatch(loginCurrentUser())

    ErrorHandler.setHandler(logoutCurrentUser)

    return AdminMoneyRequest
        .setUrl('admin/api/user/get')
        .getRequest()
        .then(res => res && dispatch(setCurrentUser(res.data.result)))
}


export const userLogin = data => dispatch => {
    dispatch(loginCurrentUser())

    ErrorHandler.setHandler(logoutCurrentUser)

    return AdminMoneyRequest
        .setUrl('admin/api/user/login')
        .setParams(qs.stringify(data))
        .postRequest()
        .then(res => {
            if (res) {
                cookies.set(TOKEN, res.data.result.authKey, {expires: 1});
                dispatch(setCurrentUser(res.data.result.user))
            }
        })

}

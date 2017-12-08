import {get} from '../../Utils/ajaxWraper'
import {setCurrentUser, loginCurrentUser, logoutCurrentUser, setLoginErrors} from "../AC/loginAC"
import {TOKEN} from '../../CONSTANTS';
import cookies from 'js-cookie';

export const getUserByToken = token => dispatch => {
    dispatch(loginCurrentUser())
    return get('admin/api/user/get', {[TOKEN]: token}, res => {
        res && dispatch(setCurrentUser(res.data.result))
    }, logoutCurrentUser, dispatch)
}


export const userLogin = data => dispatch => {
    dispatch(loginCurrentUser())
    return get('admin/api/user/login', data, res => {
        if (res) {
            cookies.set(TOKEN, res.data.result.authKey, {expires: 1});
            dispatch(setCurrentUser(res.data.result.user))
        }
    }, setLoginErrors, dispatch)
}

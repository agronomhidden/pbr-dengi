import {get} from '../../Utils/ajaxWraper'
import {setCurrentUser, loginCurrentUser, logoutCurrentUser, setLoginErrors} from "../AC/loginAC"
import {TOKEN} from '../../CONSTANTS';
import cookies from 'js-cookie';

export const getUserByToken = (token) =>
    dispatch => {
        dispatch(loginCurrentUser())
        return get(process.env.TEST_API_URL + 'user/get', {[TOKEN]: token}, res => {
            res && dispatch(setCurrentUser(res.data.result))
        }, logoutCurrentUser)
    }


export const userLogin = data =>
    dispatch => {
        dispatch(loginCurrentUser())
        return get(process.env.TEST_API_URL + 'user/login', data, res => {
            cookies.set(TOKEN, res.data.result.authKey, { expires: 1 });
            res && dispatch(setCurrentUser(res.data.result.user))
        }, setLoginErrors)
    }

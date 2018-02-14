import axios from 'axios';
import {TOKEN} from '../CONSTANTS'
import cookies from 'js-cookie';


const onError = (err, errAC, dispatch) => {
    if (err.response) {
        switch (err.response.status) {
            case 403:
                errAC && dispatch(errAC());
                return
            case 500:
                errAC && dispatch(errAC(err.response.data));
                break
            case 499:
                errAC && dispatch(errAC(err.response.data));
                return
            default:
                break
        }
    }
    throw err
}


export const get = (url, params = {}, success, errActionCreator, dispatch, withToken = true) => {

    if (withToken) {
        params[TOKEN] = params[TOKEN] ? params[TOKEN] : cookies.get(TOKEN)
    }
    axios.defaults.baseURL = process.env.API_URL

    return axios.get(url, {params})
        .then(success)
        .catch(err => onError(err, errActionCreator, dispatch));
}





import axios from 'axios';
import qs from 'qs';
import {TOKEN} from '../CONSTANTS'
import cookies from 'js-cookie';


const onError = (err, errAC, dispatch) => {
    switch (err.response.status) {
        case 403:
            errAC && dispatch(errAC());
            return;
        case 400:
            break;
        case 406:
            break;
        case 500:
            break;
        case 499:
            errAC && dispatch(errAC(err.response.data));
            return;
        default:
            break;
    }
    console.log(err);
    throw err;
};


export const get = (url, params = {}, success, errActionCreator, dispatch, withToken = true) => {

    if(withToken) {
        params[TOKEN] = params[TOKEN] ? params[TOKEN] : cookies.get(TOKEN)
    }
    axios.defaults.baseURL = process.env.API_URL

    return axios.get(url, {params})
        .then(success)
        .catch(err => onError(err, errActionCreator, dispatch));
}


export const post = (url, data, success, errActionCreator) =>
    axios.post(url, qs.stringify(data))
        .then(success)
        .catch(err => onError(err, errActionCreator));





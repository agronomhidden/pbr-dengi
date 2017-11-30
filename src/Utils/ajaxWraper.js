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
            throw err;
            return;
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
    throw err;
};


export const get = (url, params = {}, success, errActionCreator, dispatch) => {

    params[TOKEN] = params[TOKEN] ? params[TOKEN] : cookies.get(TOKEN)

    axios.defaults.baseURL = process.env.TEST_API_URL;

     if(params.ip) {
         axios.defaults.headers.common['IP'] = params.ip;
     }
         delete params.ip;


     console.log(axios.defaults.headers.common);

    return axios.get(url, {params})
        .then(success)
        .catch((err => onError(err, errActionCreator, dispatch)));
}


export const post = (url, data, success, errActionCreator) =>
    axios.post(url, qs.stringify(data))
        .then(success)
        .catch((err => onError(err, errActionCreator)));





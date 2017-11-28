import axios from 'axios';
import qs from 'qs';
import {store as serverStore} from '../Components/App/serverStore';
import {TOKEN} from '../CONSTANTS'
import cookies from 'js-cookie';

const onError = (err, errAC) => {
    switch (err.response.status) {
        case 403:
            errAC && serverStore.dispatch(errAC());
            return;
        case 400:
        case 406:
            break;
        case 500:
            break;
        case 499:
            errAC && serverStore.dispatch(errAC(err));
            return;
        default:
            break;
    }
    throw err;
};

export const get = (url, params = {}, success, errActionCreator) => {
    params[TOKEN] = params[TOKEN] ? params[TOKEN] : cookies.get(TOKEN)
    return axios.get(url, {params})
        .then(success)
        .catch((err => onError(err, errActionCreator)));
}


export const post = (url, data, success, errActionCreator) =>
    axios.post(url, qs.stringify(data))
        .then(success)
        .catch((err => onError(err, errActionCreator)));





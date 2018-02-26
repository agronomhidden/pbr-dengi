import {TOKEN, SUCCESS, LOGIN_USER} from '../CONSTANTS'


export default CookieManager => store => next => action => {
    if (action.type === LOGIN_USER + SUCCESS && action.payload.authKey) {
        CookieManager.set(TOKEN, action.payload.authKey, {expires: 1})
    }
    return next(action)
}
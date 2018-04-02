import {TOKEN, SUCCESS, LOGIN_USER, LOGOUT_CURRENT_USER} from '../CONSTANTS'
import {changeLocation} from "../Reducers/AC/locationAC"

export default (history, CookieManager) => store => next => action => {
    switch (action.type) {
        case LOGIN_USER + SUCCESS :
            if (action.payload.authKey) {
                CookieManager.set(TOKEN, action.payload.authKey, {expires: 1})
            }
            if(action.payload.user){
                store.dispatch(changeLocation(action.payload.user.location_id))
            }
            break
        case LOGOUT_CURRENT_USER:
            CookieManager.remove(TOKEN)
            history.go('/')
            break
    }

    return next(action)
}
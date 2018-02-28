import {SET_PROFILE, SETTINGS_DISTRIBUTOR, SUCCESS} from '../CONSTANTS'
import {getUserByToken} from "../Reducers/AC/authAC"


export default store => next => action => {
    switch (action.type) {
        case SET_PROFILE + SUCCESS :
            store.dispatch(getUserByToken())
            break
        case SETTINGS_DISTRIBUTOR:
            if (action.payload.value) {
                action.successAC && next(action.successAC())
                action.logoutAC && store.dispatch(action.logoutAC())
            } else {
                action.failAC && next(action.failAC())
            }
            break
    }

    return next(action)
}
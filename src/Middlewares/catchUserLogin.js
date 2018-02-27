import {LOGIN_USER, SUCCESS} from '../CONSTANTS'
import {changeLocation} from '../Reducers/AC/locationAC'

export default store => next => action => {
    if (action.type === LOGIN_USER + SUCCESS) {
        store.dispatch(changeLocation(action.payload.user.location_id));
    }
    return next(action);
}
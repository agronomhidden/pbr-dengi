import {stateToQueryString} from '../Utils/helper'
import {CHANGE_LOCATION} from "../CONSTANTS"

export default history => store => next => action => {

    if (action.type === CHANGE_LOCATION) {
        history.location.state = CHANGE_LOCATION;
    }

    if (action.toQueryString) {
        history.push({
            search: stateToQueryString(action.payload),
        });
    }
    return next(action)
}

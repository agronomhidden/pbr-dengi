import {CHANGE_LOCATION} from "../CONSTANTS"

export default history => store => next => action => {

    if (action.type === CHANGE_LOCATION) {
        history.location.state = CHANGE_LOCATION;
    }

    return next(action)
}
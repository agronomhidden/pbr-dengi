import {CHANGE_ROUTE} from "../CONSTANTS"

export default history => store => next => action => {

    if (action.type === CHANGE_ROUTE) {
        history.location.state = CHANGE_ROUTE;
    }

    return next(action)
}
import {stateToQueryString} from '../Utils/helper'

export default history => store => next => action => {
    if (action.toQueryString) {
        history.push({
            search: stateToQueryString(action.payload)
        });
    }
    return next(action)
}

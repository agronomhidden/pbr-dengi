import {stateToQueryString} from '../Utils/helper'

export default history => store => next => action => {

    console.log(history);
    
    if (action.toQueryString) {

        history.replace({
            search: stateToQueryString(action.payload)
        });
    }
    return next(action)
}

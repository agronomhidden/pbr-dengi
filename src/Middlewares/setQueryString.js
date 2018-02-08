import {stateToQueryString} from 'pbr-lib-front-utils/dist/queryStringHelper'


export default history => store => next => action => {

    if (action.toQueryString) {
        history.push({
            search: stateToQueryString(action.payload),
        });
    }
    return next(action)
}

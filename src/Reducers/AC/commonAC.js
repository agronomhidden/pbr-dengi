import {push} from 'connected-react-router'
import {SEARCH_EVENT, TOUCH_LOCATION, SET_OBSERVED} from "../../CONSTANTS"

export const search = data => ({
    type: SEARCH_EVENT,
    payload: data,
    toQueryString: true,
})

export const touchLocation = location => ({
    type: TOUCH_LOCATION,
    payload: {location}
})

export const setObserved = (key, hash) => ({
    type: SET_OBSERVED,
    payload: {key, hash}
})

export const mixHotReload = action => {
    action.hotReload = true;

    return action;
}

export const pushLocation = location => dispatch => dispatch(push(location))

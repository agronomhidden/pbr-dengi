import {push} from 'connected-react-router'
import {SEARCH_EVENT, TOUCH_LOCATION, SET_OBSERVED, INIT_APP} from "../../CONSTANTS"

export const search = data => ({
    type: SEARCH_EVENT,
    payload: data,
})

export const initApp = location => ({
    type: INIT_APP,
    payload: {location}
})

export const setObserved = (key, hash) => ({
    type: SET_OBSERVED,
    payload: {key, hash}
})

export const withHotReload = action => {
    action.hotReload = true;

    return action;
}

export const pushLocation = location => dispatch => dispatch(push(location))

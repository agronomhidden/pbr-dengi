import {push} from 'connected-react-router'
import {SEARCH_EVENT, TOUCH_LOCATION} from "../../CONSTANTS"

export const search = data => ({
    type: SEARCH_EVENT,
    payload: data,
    toQueryString: true,
})

export const touchLocation = location => ({
    type: TOUCH_LOCATION,
    payload: {location}
})

export const pushLocation = location => dispatch => dispatch(push(location))
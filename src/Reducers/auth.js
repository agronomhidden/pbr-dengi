import {
    START, SUCCESS, FAIL, ERROR,
    SET_CURRENT_USER,
    LOGOUT_CURRENT_USER
} from "../CONSTANTS"

import {Record} from 'immutable'


const ReducerState = Record({
    user: null,
    errors: null,
    loading: false
})

export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER + START:
            return state
                .set('loading', true)
                .set('errors', null)
        case SET_CURRENT_USER + SUCCESS:
            return state
                .set('user', action.payload)
                .set('loading', false)
        case SET_CURRENT_USER + FAIL:
            return state
                .set('loading', false)
                .set('errors', action.payload)
        case LOGOUT_CURRENT_USER:
            return state
                .set('user', null)
                .set('loading', false)
        case ERROR:
            return state
                .set('loading', false)
        default:
            return state;
    }
}

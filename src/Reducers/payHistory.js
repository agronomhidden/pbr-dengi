import {
    START, SUCCESS, SET_HISTORY_ITEMS, ERROR
} from "../CONSTANTS"

import {Record, OrderedMap} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'

export const payState = Record({
    payments: new OrderedMap({}),
    loading: false
})

export default (state = new payState(), action = {}) => {
    switch (action.type) {
        case SET_HISTORY_ITEMS + START:
            return state
                .set('loading', true)
        case SET_HISTORY_ITEMS + SUCCESS:
            return state
                .set('loading', false)
                .set('payments', arrToMap(action.payload.list))
        case ERROR:
            return state
                .set('loading', false)
        default:
            return state;
    }
}
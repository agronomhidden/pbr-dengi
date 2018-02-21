import {
    START, SUCCESS, SET_HISTORY_ITEMS, GET_PAYMENTS_HISTORY, ERROR
} from "../CONSTANTS"

import {Record, OrderedMap} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'

export const payState = Record({
    payments: new OrderedMap({}),
    HILoading: false,
    PHLoading: false,
    PHCount: null,
    history: new OrderedMap({})
})

export default (state = new payState(), action = {}) => {
    switch (action.type) {
        case SET_HISTORY_ITEMS + START:
            return state
                .set('HILoading', true)
        case SET_HISTORY_ITEMS + SUCCESS:
            return state
                .set('HILoading', false)
                .set('payments', arrToMap(action.payload.list))
        case GET_PAYMENTS_HISTORY + START:
            return state
                .set('PHLoading', true)
                .set('PHCount', null)
        case GET_PAYMENTS_HISTORY + SUCCESS:
            return state
                .set('PHLoading', false)
                .set('PHCount', action.payload.count)
                .set('history', arrToMap(action.payload.list))
        case ERROR:
            return state
                .set('loading', false)
        default:
            return state;
    }
}
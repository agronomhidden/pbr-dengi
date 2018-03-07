import {
    START, SUCCESS, SET_HISTORY_ITEMS, SET_HISTORY_LIST
} from "../CONSTANTS"

import {Record, OrderedMap} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'

export const payState = Record({
    historyItems: new OrderedMap({}),
    HILoading: false,
    historyList: new OrderedMap({}),
    HLLoading: false,
    searchFields: null,
    HLLCount: null,
})

export default (state = new payState(), action = {}) => {
    switch (action.type) {
        case SET_HISTORY_ITEMS + START:
            return state
                .set('HILoading', true)
        case SET_HISTORY_ITEMS + SUCCESS:
            return state
                .set('HILoading', false)
                .mergeIn(['historyItems'], arrToMap(action.payload.list, undefined, item => item.transaction_uuid))
        case SET_HISTORY_LIST + START:
            return state
                .set('HLLoading', true)
                .set('searchFields', action.payload)
                .set('HLLCount', null)
        case SET_HISTORY_LIST + SUCCESS:
            return state
                .set('HLLoading', false)
                .set('HLLCount', action.payload.count)
                .set('historyList', arrToMap(action.payload.list))
        default:
            return state;
    }
}
import {
    START, SUCCESS, FAIL, RESET,
    DIALOG,
} from "../CONSTANTS"


import {Record, List, Map} from 'immutable'
import {arrToMap} from "../Utils/helper"


const ReducerState = Record({
    errors: null,
    loading: false,
    dialogBlocks: List([]),
    summary: null,
    mts_session: null
})


export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case DIALOG + START:
            return state
                .set('loading', true)
                .set('errors', null)
                .set('mts_session', null)
                .set('dialogBlocks', List([]))
        case DIALOG + RESET:
            return state
                .set('loading', true)
                .set('errors', null)
        case DIALOG + SUCCESS:
            return state
                .set('loading', false)
                .set('mts_session', action.payload.mts_session)
                .updateIn(['dialogBlocks'], list => list.push(Map({
                    fields: arrToMap(action.payload.fields, (item) => item.name),
                    summary: action.payload.summary
                })))
        case DIALOG + FAIL:
            return state
                .set('loading', false)
                .set('errors', action.payload)
        default:
            return state;
    }
}

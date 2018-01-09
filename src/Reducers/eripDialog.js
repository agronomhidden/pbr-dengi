import {
    START, SUCCESS, FAIL, RESET,
    DIALOG, FAILED,
} from "../CONSTANTS"


import {Record, List, Map} from 'immutable'
import {arrToMap} from "../Utils/helper"


const ReducerState = Record({
    errors: null,
    loading: false,
    dialogBlocks: [],
    summary: null,
    mts_session: null,
    fault: null
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
            const {mts_session, fields, summary} = action.payload;
            return state
                .set('mts_session', mts_session)
                .set('loading', false)
                .updateIn(['dialogBlocks'],list =>
                    list.push(Map({
                        fields: arrToMap(fields, item => item.name),
                        summary: summary
                    })))
        case DIALOG + FAIL:
            return state
                .set('loading', false)
                .set('errors', action.payload)
        case DIALOG + FAILED:
            return state
                .set('loading', false)
                .set('fault', action.payload)
        default:
            return state;
    }
}

import {
    START, SUCCESS, FAIL, RESET,
    DIALOG, FAILED, OVER
} from "../CONSTANTS"


import {Record, List, Map} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'
import {DialogFieldsRecord} from "./entities"

const ReducerState = Record({
    errors: null,
    loading: false,
    dialogBlocks: [],
    summary: null,
    mts_session: null,
    fault: null,
    success: false
})


export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case DIALOG + START:
            return state
                .set('loading', true)
                .set('errors', null)
                .set('fault', null)
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
                .updateIn(['dialogBlocks'], list =>
                    list.push(Map({
                        fields: arrToMap(fields, DialogFieldsRecord, item => item.name),
                        summary: summary
                    })))
        case DIALOG + OVER:
            return state
                .set('loading', false)
                .set('success', action.payload.success)
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

import {
    CHANGE_PASSWORD, SET_PROFILE, TOTAL_LOGOUT, DELETE_SUBSCRIPTION, START, SUCCESS, ERROR,
    SETTINGS_FIELDS_ERROR, FAIL
} from "../CONSTANTS"

import {Record} from 'immutable'

export const settingState = Record({
    ChPLoading: false,
    ChPSuccess: false,
    SPLoading: false,
    SPSuccess: false,
    TLLoading: false,
    TLFail: false,
    DSLoading: false,
    DSFail: false,
    DSSuccess: false,
    errors: null,
})

export default (state = new settingState(), action = {}) => {
    switch (action.type) {
        case CHANGE_PASSWORD + START:
            return state
                .set('ChPLoading', true)
                .set('ChPSuccess', false)
                .set('errors', null)
        case CHANGE_PASSWORD + SUCCESS:
            return state
                .set('ChPLoading', false)
                .set('ChPSuccess', true)
        case SET_PROFILE + START:
            return state
                .set('SPLoading', true)
                .set('SPSuccess', false)
                .set('errors', null)
        case SET_PROFILE + SUCCESS:
            return state
                .set('SPLoading', false)
                .set('SPSuccess', true)
        case SETTINGS_FIELDS_ERROR:
            return state
                .set('SPLoading', false)
                .set('ChPLoading', false)
                .set('errors', action.payload)
        case TOTAL_LOGOUT + START:
            return state
                .set('TLLoading', true)
                .set('TLFail', false)
        case TOTAL_LOGOUT + SUCCESS:
            return state
                .set('TLLoading', false)
        case TOTAL_LOGOUT + FAIL:
            return state
                .set('TLLoading', false)
                .set('TLFail', true)
        case DELETE_SUBSCRIPTION + START:
            return state
                .set('DSLoading', true)
                .set('DSSuccess', false)
                .set('DSFail', false)
        case DELETE_SUBSCRIPTION + SUCCESS:
            return state
                .set('DSLoading', false)
                .set('DSSuccess', true)
        case DELETE_SUBSCRIPTION + FAIL:
            return state
                .set('DSLoading', false)
                .set('DSFail', true)
        case ERROR:
            return state
                .set('loading', false)
        default:
            return state;
    }
}
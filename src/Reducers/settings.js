import {
    CHANGE_PASSWORD, SET_PROFILE, SET_RULES, TOTAL_LOGOUT, DELETE_SUBSCRIPTION, START, SUCCESS, FAIL, ERROR,
    SET_CURRENT_USER ,SETTINGS_FIELDS_ERROR
} from "../CONSTANTS"

import {Record} from 'immutable'

export const settingState = Record({
    ChPLoading: false,
    ChPSuccessMsg: null,
    SPLoading: false,
    SPSuccessMsg: null,
    errors: null
})

export default (state = new settingState(), action = {}) => {
    switch (action.type) {
        case CHANGE_PASSWORD + START:
            return state
                .set('ChPLoading', true)
                .set('ChPSuccessMsg', false)
                .set('errors' ,null)
        case CHANGE_PASSWORD + SUCCESS:
            return state
                .set('ChPLoading', false)
                .set('ChPSuccessMsg', 'Пароль успешно изменен')
        case SET_PROFILE + START:
            return state
                .set('SPLoading', true)
                .set('SPSuccessMsg', false)
                .set('errors' ,null)
        case SET_PROFILE + SUCCESS:
            return state
                .set('SPLoading', false)
                .set('SPSuccessMsg', 'Данные успешно обновленны')
        case SETTINGS_FIELDS_ERROR:
            return state
                .set('SPLoading', false)
                .set('ChPLoading', false)
                .set('errors', action.payload)
        case ERROR:
            return state
                .set('loading', false)
        default:
            return state;
    }
}
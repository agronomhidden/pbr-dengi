import {
    START, SUCCESS, RESET,
    SET_CATEGORIES,
    SET_AUTO_COMPLETE
} from "../CONSTANTS"

import {Record, OrderedMap} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'

const ReducerState = Record({
    count_categories: null,
    count_services: null,
    categories: new OrderedMap({}),
    searchValue: '',
    loading: false,
    autoCompleteDetected: [],
    autoCompleteLoading: false,
    autoCompleteWorks: false,
})

export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case SET_CATEGORIES + START:
            return state
                .set('loading', true)
                .set('searchValue', action.searchQuery)
                .set('autoCompleteDetected', [])
                .set('autoCompleteWorks', false)
        case SET_CATEGORIES + SUCCESS:
            return state
                .set('loading', false)
                .set('categories', arrToMap(action.payload.data))
        case SET_AUTO_COMPLETE + START:
            return state
                .set('autoCompleteLoading', true)
                .set('autoCompleteWorks', true)
                .set('autoCompleteDetected', [])
        case SET_AUTO_COMPLETE + SUCCESS:

            return state
                .set('autoCompleteLoading', false)
                .set('autoCompleteDetected', [
                    {
                        title: 'Категории',
                        suggestions: action.payload.categories,
                    },
                    {
                        title: 'Сервисы',
                        suggestions: action.payload.services,
                    }])
        case SET_AUTO_COMPLETE + RESET:
            return state
                .set('autoCompleteDetected', [])
        default:
            return state;
    }
}
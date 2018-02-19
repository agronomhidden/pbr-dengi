import {
    START, SUCCESS, RESET,
    SET_CATEGORIES,
    SET_AUTO_COMPLETE, ERROR, FAIL
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
                .set('searchValue', action.payload)
                .set('autoCompleteDetected', [])
                .set('autoCompleteWorks', false)
                .set('count_categories', null)
                .set('count_services', null)
        case SET_CATEGORIES + SUCCESS:
            const {data, count_categories, count_services} = action.payload

            return state
                .set('loading', false)
                .set('categories', arrToMap(data))
                .set('count_categories', count_categories)
                .set('count_services', count_services)

        case SET_AUTO_COMPLETE + START:
            return state
                .set('autoCompleteLoading', true)
                .set('autoCompleteWorks', true)
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
                .set('searchValue', action.searchQuery)
        case SET_CATEGORIES + FAIL:
            return state
                .set('loading', false)
        default:
            return state;
    }
}
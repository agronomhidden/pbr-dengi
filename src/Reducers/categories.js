import {
    START, SUCCESS, RESET,
    SET_CATEGORIES,
    SET_AUTO_COMPLETE
} from "../CONSTANTS"

import {Record, OrderedMap, List} from 'immutable'
import {arrToMap, setSearchValue, queryStringToState} from '../Utils/helper';

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
                .set('searchValue', setSearchValue(queryStringToState(), 'searchQuery'))
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
                        title: 'категории',
                        suggestions: action.payload.categories,
                    },
                    {
                        title: 'сервисы',
                        suggestions: action.payload.services,
                    }])
        case SET_AUTO_COMPLETE + RESET:
            return state
                .set('autoCompleteDetected', new OrderedMap({}))
                .set('autoCompleteWorks', false)
        default:
            return state;
    }
}
import {
    START, SUCCESS, FAIL,
    SET_CATEGORIES,
} from "../CONSTANTS"

import {Record} from 'immutable'
import {arrToMap, setSearchValue,queryStringToState} from '../Utils/helper';

const ReducerState = Record({
    count_categories: null,
    count_services: null,
    categories: null,
    searchValue: '',
    loading: false
})

export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case SET_CATEGORIES + START:
            return state
                .set('categories', null)
                .set('loading', true)
                .set('searchValue',setSearchValue(queryStringToState(),'searchQuery'))
        case SET_CATEGORIES + SUCCESS:
            console.log(action.payload.data);
            return state
                .set('categories', arrToMap(action.payload.data))
                .set('loading', false);
        case SET_CATEGORIES + FAIL:
            return state
                .set('loading', false);
        default:
            return state;
    }
}
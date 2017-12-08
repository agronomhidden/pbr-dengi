import {
    START, SUCCESS,FAIL,
    SET_CATEGORIES,
} from "../CONSTANTS"

import {Record} from 'immutable'
import {arrToMap} from '../Utils/helper';

const ReducerState = Record({
    categories: null,
    loading: false
})

export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case SET_CATEGORIES + START:
            return state
                .set('categories', null)
                .set('loading', true)
        case SET_CATEGORIES + SUCCESS:
            console.log(SET_CATEGORIES + SUCCESS);
            return state
                .set('categories', arrToMap(action.payload.data))
                .set('loading', false);
        case SET_CATEGORIES + FAIL:
            console.log(SET_CATEGORIES + FAIL);
            return state
                .set('loading', false);
        default:
            return state;
    }
}
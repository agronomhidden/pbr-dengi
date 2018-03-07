import {
    GET_FAVORITES, ADD_FAVORITE, FAVORITE, UPDATE_FAVORITE, DELETE_FAVORITE,
    START, SUCCESS, FAIL
} from "../CONSTANTS"

import {Record, OrderedMap} from 'immutable'
import {arrToMap} from "pbr-lib-front-utils/dateManipulation"


export const favoriteState = Record({
    favorites: new OrderedMap({}),
    loading: false,
    success: false,
    errors: null
})

export default (state = new favoriteState(), action = {}) => {
    switch (action.type) {
        case GET_FAVORITES + START:
        case ADD_FAVORITE + START:
        case UPDATE_FAVORITE + START:
        case DELETE_FAVORITE + START:
            return state
                .set('errors', null)
                .set('loading', true)
                .set('success', false)
        case GET_FAVORITES + SUCCESS:
            return state
                .set('loading', false)
                .set('favorites', arrToMap(action.payload.list))
        case UPDATE_FAVORITE + SUCCESS:
        case ADD_FAVORITE + SUCCESS:
            return state
                .set('loading', true)
                .set('success', true)
        case FAVORITE + FAIL:
            return state
                .set('loading', false)
                .set('errors', action.payload)
        default:
            return state;
    }
}
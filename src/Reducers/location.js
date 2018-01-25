import {
    START, SUCCESS, SET_LOCATION, FAIL
} from "../CONSTANTS"

import {Record, OrderedMap} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'


const ReducerState = Record({
    regions: new OrderedMap({}),
    cities: new OrderedMap({}),
    loading: false
})

export default (state = new ReducerState(), action = {}) => {

    switch (action.type) {
        case SET_LOCATION + START:
            return state
                .set('loading', true)
        case SET_LOCATION + SUCCESS:
            return state
                .set('loading', false)
                .set('cities', arrToMap(action.payload.cities))
                .set('regions', arrToMap(action.payload.regions))
        case SET_LOCATION + FAIL:
            return state
                .set('loading', false)
        default:
            return state;
    }
}
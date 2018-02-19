import {
    START, SUCCESS, SET_LOCATION, ERROR
} from "../CONSTANTS"

import {Record, OrderedMap} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'


const ReducerState = Record({
    regions: new OrderedMap({}),
    cities: new OrderedMap({}),
    loading: false,
    locationId: null
})

export default (state = new ReducerState(), action = {}) => {

    switch (action.type) {
        case SET_LOCATION + START:
            return state
                .set('loading', true)
                .set('locationId', action.payload)
        case SET_LOCATION + SUCCESS:
            return state
                .set('loading', false)
                .set('cities', arrToMap(action.payload.cities))
                .set('regions', arrToMap(action.payload.regions))
        case ERROR:
            return state
                .set('loading', false)
        default:
            return state;
    }
}
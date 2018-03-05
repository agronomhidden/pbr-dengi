import {Record, OrderedMap} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'

import {GET_BANNERS, CREATE_USER_DATA_WITH_BANNER, START, SUCCESS, FAIL, RESET, ACCOUNTS_SLIDER_LOADED} from "../CONSTANTS";

const ReducerState = Record({
    slider: new OrderedMap({}),
    loadingDataForSlider: null,
    error: null,
    success: null,
    allDivLoaded: 0b00000

})

export default (state = new ReducerState(), action = {}) => {

    switch (action.type) {
        case GET_BANNERS + START:
            return state;
        case GET_BANNERS + SUCCESS:
            const loaded = state.get('allDivLoaded')
            return state.set('slider', arrToMap(action.payload.items)).set('allDivLoaded', loaded | ACCOUNTS_SLIDER_LOADED)

        case CREATE_USER_DATA_WITH_BANNER + START:
            return state.set('loadingDataForSlider', action.payload.service_id).set('error', null).set('success', null)
        case CREATE_USER_DATA_WITH_BANNER + SUCCESS:
            return state.set('loadingDataForSlider', null).set('error', null).set('success', action.payload);
        case CREATE_USER_DATA_WITH_BANNER + FAIL:
            return state.set('loadingDataForSlider', null).set('error', action.payload);
        case CREATE_USER_DATA_WITH_BANNER + RESET:
            return state.set('loadingDataForSlider', null).set('error', null).set('success', null);
    }
    return state
}

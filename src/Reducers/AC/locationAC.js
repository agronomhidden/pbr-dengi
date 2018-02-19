import {API_REQUEST_ACTION, SET_LOCATION, START, SUCCESS} from "../../CONSTANTS"
import BaseApiCaller from "../../Services/Api/BaseApiCaller"

export function loadLocation (locationId) {
    return {
        type: SET_LOCATION + START,
        payload: locationId
    }
}

export const locationLoaded = response => ({
    type: SET_LOCATION + SUCCESS,
    payload: response,
})

export function getLocations() {
    return {
        type: API_REQUEST_ACTION,
        method: BaseApiCaller.GET_LOCATION_METHOD,
        payload: {},
        beforeAC: (paramsContainer) => loadLocation(paramsContainer.getLocationId()),
        successAC: locationLoaded
    }
}




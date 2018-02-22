import {API_REQUEST_ACTION, SET_LOCATION, CHANGE_LOCATION, START, SUCCESS} from "../../CONSTANTS"
import {MessageGetLocation} from "../../Services/Api/Messages/messagesClassStorage";

export function loadLocation(locationId) {
    return {
        type: SET_LOCATION + START,
        payload: locationId
    }
}

export function locationLoaded(response) {
    return {
        type: SET_LOCATION + SUCCESS,
        payload: response,
    }
}

export function changeLocation(location_id) {
    return {
        type: CHANGE_LOCATION,
        payload: location_id,
    }
}

export function getLocations() {
    return {
        type: API_REQUEST_ACTION,
        method: MessageGetLocation.GET_LOCATION_METHOD,
        payload: {},
        beforeAC: (paramsContainer) => loadLocation(paramsContainer.getLocationId()),
        successAC: locationLoaded
    }
}




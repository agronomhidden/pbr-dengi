import {SET_LOCATION, START, SUCCESS} from "../../CONSTANTS"

export const loadLocation = locationId => ({
    type: SET_LOCATION + START,
    locationId
})

export const locationLoaded = response => ({
    type: SET_LOCATION + SUCCESS,
    payload: response,
})




import {FAIL, SET_LOCATION, START, SUCCESS} from "../../CONSTANTS"

export const loadLocation = () => ({
    type: SET_LOCATION + START
})

export const locationLoaded = (response, locationId) => ({
    type: SET_LOCATION + SUCCESS,
    payload: response,
    locationId
})

export const setLocationErrors = _ => ({
    type: SET_LOCATION + FAIL
})


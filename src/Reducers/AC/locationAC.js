import {FAIL, SET_CATEGORIES, SET_LOCATION, START, SUCCESS} from "../../CONSTANTS"

export const loadLocation = () => ({
    type: SET_LOCATION + START
})

export const locationLoaded = response => {
    console.log(response);
    return {
    type: SET_LOCATION + SUCCESS,
    payload: response,
}}

export const setLocationErrors = _ => ({
    type: SET_LOCATION + FAIL,
})


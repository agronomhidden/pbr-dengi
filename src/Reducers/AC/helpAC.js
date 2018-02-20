import {SERVICE_DESCRIPTION, FAIL, START, SUCCESS} from "../../CONSTANTS"

export const getDescriptionStart = () => ({
    type: SERVICE_DESCRIPTION + START
})

export const getDescriptionSuccess = response => ({
    type: SERVICE_DESCRIPTION + SUCCESS,
    payload: response
})


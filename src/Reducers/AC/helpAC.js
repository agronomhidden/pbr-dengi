import {SERVICE_DESCRIPTION, START, SUCCESS, API_REQUEST_ACTION} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages/messagesClassStorage"

export const getDescriptionStart = () => ({
    type: SERVICE_DESCRIPTION + START
})

export const getDescriptionSuccess = response => ({
    type: SERVICE_DESCRIPTION + SUCCESS,
    payload: response
})

export const getDescription = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetDescription.GET_DESCRIPTION_METHOD,
    beforeAC: (paramsContainer) => getDescriptionStart(),
    successAC: getDescriptionSuccess
})

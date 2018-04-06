import {SERVICE_DESCRIPTION, SOCIAL_RULES, USER_AGREEMENT, START, SUCCESS, API_REQUEST_ACTION} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages"

export const getDescriptionStart = () => ({
    type: SERVICE_DESCRIPTION + START
})

export const getDescriptionSuccess = response => ({
    type: SERVICE_DESCRIPTION + SUCCESS,
    payload: response
})

export const getDescription = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetDescription.METHOD,
    beforeAC: (paramsContainer) => getDescriptionStart(),
    successAC: getDescriptionSuccess
})

export const getSocialStart = () => ({
    type: SOCIAL_RULES + START
})

export const getSocialSuccess = response => ({
    type: SOCIAL_RULES + SUCCESS,
    payload: response
})


export const getSocial = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetSocial.METHOD,
    beforeAC: (paramsContainer) => getSocialStart(),
    successAC: getSocialSuccess
})

export const getAgreementStart = () => ({
    type: USER_AGREEMENT + START,
})

export const getAgreementSuccess = response => ({
    type: USER_AGREEMENT + SUCCESS,
    payload: response
})

export const getUserAgreement = () => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageUserAgreement.METHOD,
    beforeAC: (paramsContainer) => getAgreementStart(),
    successAC: getAgreementSuccess,
})
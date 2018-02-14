import {FAIL, SEND_MAIL, START, SUCCESS} from "../../CONSTANTS"

export const mailSent = sectionID => ({
    type: SEND_MAIL + START,
    sectionID
})

export const mailSended = response => ({
    type: SEND_MAIL + SUCCESS,
    payload: response
})

export const mailSentFail = (response) => ({
    type: SEND_MAIL + FAIL,
    payload: {fields: response.result, msg: response.message}
})
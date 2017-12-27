import {DIALOG, SUCCESS, START, FAIL, RESET} from "../../CONSTANTS"

export const initDialogStart = () => ({
    type: DIALOG + START
})

export const dialogAnswer = response => ({
    type: DIALOG + SUCCESS,
    payload: response,
})

export const dialogErrors = response => ({
    type: DIALOG + FAIL,
    payload: {fields: response.result, msg: response.message},
})

export const dialogContinue = () => ({
    type: DIALOG + RESET
})

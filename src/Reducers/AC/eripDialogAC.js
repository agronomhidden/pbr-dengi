import {DIALOG, SUCCESS, START, RESET, FAILED, OVER} from "../../CONSTANTS"

export const initDialogStart = () => ({
    type: DIALOG + START
})

export const dialogAnswer = response => ({
    type: DIALOG + SUCCESS,
    payload: response,
})

export const dialogContinue = () => ({
    type: DIALOG + RESET
})

export const dialogFailed = response => ({
    type: DIALOG + FAILED,
    payload: response
})

export const dialogOver = response => ({
    type: DIALOG + OVER,
    payload: response
})
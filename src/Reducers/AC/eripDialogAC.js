import {
    DIALOG, SUCCESS, START, RESET, FAILED, FAIL, OVER, API_REQUEST_ACTION,
    DIALOG_DISTRIBUTOR
} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages"

export const initDialogStart = () => ({
    type: DIALOG + START
})

export const dialogSuccess = response => ({
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

export const dialogOver = () => ({
    type: DIALOG + OVER
})

export const dialogFail = response => ({
    type: DIALOG + FAIL,
    payload: {fields: response.result, msg: response.message}
})

export const initDialogDistributor = response => ({
    type: DIALOG_DISTRIBUTOR,
    payload: response,
    successAC: dialogSuccess,
    failAC: dialogFailed
})

export const requestInDialogDistributor = response => ({
    type: DIALOG_DISTRIBUTOR,
    payload: response,
    successAC: dialogSuccess,
    failAC: dialogFailed,
    overAC: dialogOver
})

export const initDialog = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageEripDialog.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => initDialogStart(),
    successAC: initDialogDistributor
})

export const requestInDialog = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageEripDialog.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => dialogContinue(),
    successAC: requestInDialogDistributor,
    fieldErrorAC: dialogFail
})


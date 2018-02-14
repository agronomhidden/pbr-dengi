import {
    initDialogStart,
    dialogContinue,
    dialogAnswer,
    dialogFailed,
    dialogOver,
    eripDialogFail
} from "../AC/eripDialogAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"

import ErrorHandler from "../../Utils/ErrorHandler"

export const initDialog = params => dispatch => {
    dispatch(initDialogStart())

    ErrorHandler.setFieldsErrorHandler(eripDialogFail)

    MtsMoneyRequest
        .setMethod('erip-dialog')
        .setParams({serviceCode: params.id})
        .postRequest()
        .then(res => res && res.data && dispatch(res.data.result.status === 'fail' ?
            dialogFailed(res.data.result.errors) :
            dialogAnswer(res.data.result)))
}


export const requestInDialog = data => dispatch => {
    dispatch(dialogContinue())

    MtsMoneyRequest
        .setMethod('erip-dialog')
        .setParams(data)
        .postRequest()
        .then(res => {
            if (res && res.data) {
                if (res.data.result.status === 'fail') {
                    dispatch(dialogFailed(res.data.result.errors))
                    return
                }
                if (res.data.result.advanced) {
                    dispatch(dialogOver(res.data.result))
                    return
                }
                dispatch(dialogAnswer(res.data.result))
            }
        })
}

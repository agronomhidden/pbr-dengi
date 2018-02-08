import {
    initDialogStart,
    dialogContinue,
    dialogAnswer,

    dialogFailed,
    dialogOver
} from "../AC/eripDialogAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"


export const initDialog = params => dispatch => {
    dispatch(initDialogStart())

    return MtsMoneyRequest
        .setMethod('erip-dialog')
        .setParams({serviceCode: params.id})
        .postRequest()
        .then(res => res && dispatch(res.data.result.status === 'fail' ? dialogFailed(res.data.result.errors) : dialogAnswer(res.data.result)))
}


export const requestInDialog = data => dispatch => {
    dispatch(dialogContinue())

    return MtsMoneyRequest
        .setMethod('erip-dialog')
        .setParams(data)
        .postRequest()
        .then(res =>{
            if (res) {
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

import {get} from '../../Utils/ajaxWraper'
import {
    initDialogStart,
    dialogContinue,
    dialogAnswer,
    dialogErrors,
    dialogFailed,
    dialogOver
} from "../AC/eripDialogAC"


export const initDialog = params => dispatch => {
    dispatch(initDialogStart())
    return get('api/erip-dialog', {serviceCode: params.id}, res => {
        res && dispatch(res.data.result.status === 'fail' ? dialogFailed(res.data.result.errors) : dialogAnswer(res.data.result))
    }, dialogErrors, dispatch)
}


export const requestInDialog = data => dispatch => {
    dispatch(dialogContinue())
    return get('api/erip-dialog', data, res => {

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

    }, dialogErrors, dispatch)
}

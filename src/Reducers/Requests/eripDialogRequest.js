import {get} from '../../Utils/ajaxWraper'
import {initDialogStart, dialogContinue, dialogAnswer, dialogErrors} from "../AC/eripDialogAC"


export const initDialog = params => dispatch => {
    dispatch(initDialogStart())

    return get('api/erip-dialog', {serviceCode: params.id}, res => {
        res && dispatch(dialogAnswer(res.data.result))
    }, dialogErrors, dispatch)
}


export const requestInDialog = data => dispatch => {
    dispatch(dialogContinue())

    return get('api/erip-dialog', data, res => {
            res && dispatch(dialogAnswer(res.data.result))
    }, dialogErrors, dispatch)
}

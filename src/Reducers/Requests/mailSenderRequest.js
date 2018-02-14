import {mailSended, mailSent, mailSentFail} from "../AC/mailSenderAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"
import ErrorHandler from "../../Utils/ErrorHandler"

export const mailSender = (params, sectionID = 0) => dispatch => {
    dispatch(mailSent(sectionID))

    ErrorHandler.setFieldsErrorHandler(mailSentFail)

    MtsMoneyRequest
        .setMethod('payments/send-invoice')
        .setParams(params)
        .postRequest()
        .then(res => res && res.data && dispatch(mailSended(res.data.result)))
}
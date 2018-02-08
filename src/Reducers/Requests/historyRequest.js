import {loadPaymentsHistoryItems, paymentsHistoryItemsLoaded} from "../AC/historyAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"


export const getHistoryItem = params => dispatch => {
    dispatch(loadPaymentsHistoryItems())

    params.transaction_uuids = params.transaction_uuids.split(',')

    return MtsMoneyRequest
        .setMethod('payments/history-item')
        .setParams({'Dfz':null})
        .validateParams()
        .postRequest()
        .then(res => res && dispatch(paymentsHistoryItemsLoaded(res.data.result)))
}
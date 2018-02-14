import {loadPaymentsHistoryItems, paymentsHistoryItemsLoaded} from "../AC/payHistoryAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"

export const getHistoryItem = params => dispatch => {
    dispatch(loadPaymentsHistoryItems())

    if (params && params.transaction_uuids) {
        params.transaction_uuids = params.transaction_uuids.split(',')
        params.advanced = 1
    }

    MtsMoneyRequest
        .setMethod('payments/history-item')
        .setParams(params)
        .postRequest()
        .then(res => res && res.data && dispatch(paymentsHistoryItemsLoaded(res.data.result)))
}



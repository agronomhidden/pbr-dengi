import {loadPaymentsHistoryItems, paymentsHistoryItemsLoaded,
    getPaymentsHistoryStart,getPaymentsHistorySuccess} from "../AC/payHistoryAC"
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"

export const getHistoryItem = params => dispatch => {
    dispatch(loadPaymentsHistoryItems())

    if (params && params.transaction_uuids) {
        params.transaction_uuids = params.transaction_uuids.split(',')
        params.advanced = 1
    }

    return MtsMoneyRequest
        .setMethod('payments/history-item')
        .setParams(params)
        .postRequest()
        .then(res => res && res.data && dispatch(paymentsHistoryItemsLoaded(res.data.result)))
}

export const getHistory = (params = {}) => dispatch => {


    dispatch(getPaymentsHistoryStart())

    params['per_page'] = 10
    params['page'] = 1

    return MtsMoneyRequest
        .setMethod('payments/history')
        .setParams(params)
        .postRequest()
        .then(res => res && res.data && dispatch(getPaymentsHistorySuccess(res.data.result)))
}



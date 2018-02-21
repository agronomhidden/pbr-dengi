import {SET_HISTORY_ITEMS, GET_PAYMENTS_HISTORY, START, SUCCESS} from "../../CONSTANTS"

export const loadPaymentsHistoryItems = () => ({
    type: SET_HISTORY_ITEMS + START
})

export const paymentsHistoryItemsLoaded = response => ({
    type: SET_HISTORY_ITEMS + SUCCESS,
    payload: response
})

export const getPaymentsHistoryStart = () => ({
    type: GET_PAYMENTS_HISTORY + START
})

export const getPaymentsHistorySuccess = response => ({
    type: GET_PAYMENTS_HISTORY + SUCCESS,
    payload: response
})
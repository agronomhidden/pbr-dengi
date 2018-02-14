import {SET_HISTORY_ITEMS, START, SUCCESS} from "../../CONSTANTS"

export const loadPaymentsHistoryItems = () => ({
    type: SET_HISTORY_ITEMS + START
})

export const paymentsHistoryItemsLoaded = response => ({
    type: SET_HISTORY_ITEMS + SUCCESS,
    payload: response
})


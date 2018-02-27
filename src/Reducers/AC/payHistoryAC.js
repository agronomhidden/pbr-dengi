import {SET_HISTORY_ITEMS, SET_HISTORY_LIST, START, SUCCESS, API_REQUEST_ACTION} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages/messagesClassStorage"
import {logoutCurrentUser} from "./authAC"

export const loadPaymentsHistoryItems = () => ({
    type: SET_HISTORY_ITEMS + START
})

export const paymentsHistoryItemsLoaded = response => ({
    type: SET_HISTORY_ITEMS + SUCCESS,
    payload: response
})

export const getPaymentsHistoryStart = () => ({
    type: SET_HISTORY_LIST + START
})

export const getPaymentsHistorySuccess = response => ({
    type: SET_HISTORY_LIST + SUCCESS,
    payload: response
})

export const getHistoryList = (date_to = '', date_from = '') => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetHistory.METHOD,
    payload: {date_to, date_from},
    beforeAC: (paramsContainer) => getPaymentsHistoryStart(),
    successAC: getPaymentsHistorySuccess,
    forbiddenErrorAC: logoutCurrentUser
})

export const getHistoryItems = params => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageGetHistoryItems.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => loadPaymentsHistoryItems(),
    successAC: paymentsHistoryItemsLoaded,
    forbiddenErrorAC: logoutCurrentUser
})
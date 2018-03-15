import {SET_HISTORY_ITEMS, SET_HISTORY_LIST, START, SUCCESS, API_REQUEST_ACTION} from "../../CONSTANTS"
import * as msg from "../../Services/Api/Messages"
import {logoutCurrentUser} from "./authAC"


export const loadPaymentsHistoryItems = () => ({
    type: SET_HISTORY_ITEMS + START
})

export const paymentsHistoryItemsLoaded = response => ({
    type: SET_HISTORY_ITEMS + SUCCESS,
    payload: response
})

export const getPaymentsHistoryStart = searchFields => ({
    type: SET_HISTORY_LIST + START,
    payload: searchFields
})

export const getPaymentsHistorySuccess = response => ({
    type: SET_HISTORY_LIST + SUCCESS,
    payload: response
})

export const getHistoryList = data => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageGetHistory.METHOD,
    payload: {date_to: data && data.date_to || null, date_from: data && data.date_from || null},
    beforeAC: (paramsContainer) => getPaymentsHistoryStart(data),
    successAC: getPaymentsHistorySuccess,
    forbiddenErrorAC: logoutCurrentUser
})

export const getHistoryItems = params => ({
    type: API_REQUEST_ACTION,
    method: msg.MessageGetHistoryItems.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => loadPaymentsHistoryItems(),
    successAC: paymentsHistoryItemsLoaded,
    forbiddenErrorAC: logoutCurrentUser
})
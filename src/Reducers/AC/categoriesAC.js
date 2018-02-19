import {SET_CATEGORIES, SET_AUTO_COMPLETE, SUCCESS, START, FAIL, RESET, API_REQUEST_ACTION} from "../../CONSTANTS"
import {search} from './commonAC'
import BaseApiCaller from "../../Services/Api/BaseApiCaller";

export const loadCategories = (searchQuery = '') => ({
    type: SET_CATEGORIES + START,
    payload: searchQuery
})

export const categoriesLoaded = response => ({
    type: SET_CATEGORIES + SUCCESS,
    payload: response
})

export const categoriesSetSearch = data => dispatch => {
    dispatch(search(data));
}

export const loadAutoComplete = _ => ({
    type: SET_AUTO_COMPLETE + START,
})

export const autoCompleteLoaded = response => ({
    type: SET_AUTO_COMPLETE + SUCCESS,
    payload: response
})

export const resetAutoComplete = searchQuery => ({
    type: SET_AUTO_COMPLETE + RESET,
    searchQuery
})

export function getCategories(params) {
    return {
        type: API_REQUEST_ACTION,
        method: BaseApiCaller.GET_CATEGORIES_METHOD,
        payload: params,
        beforeAC: (paramsContainer) => loadCategories(params.searchQuery || ''),
        successAC: categoriesLoaded
    }
}



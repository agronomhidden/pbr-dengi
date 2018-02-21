import {SET_CATEGORIES, SET_AUTO_COMPLETE, SUCCESS, START, FAIL, RESET, API_REQUEST_ACTION} from "../../CONSTANTS"
import {search} from './commonAC'
import * as creator from "../../Services/Messages/messageCreators";

export const loadCategories = (searchQuery = '') => ({
    type: SET_CATEGORIES + START,
    payload: searchQuery
})

export function categoriesLoaded(response) {
    return {
        type: SET_CATEGORIES + SUCCESS,
        payload: response
    }
}
export function categoriesLoadingError(xhr) {
    return {
        type: SET_CATEGORIES + FAIL,
    }
}

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
        method: creator.MessageGetCategories.GET_CATEGORIES_METHOD,
        payload: params,
        beforeAC: (paramsContainer) => loadCategories(params.searchQuery || ''),
        successAC: categoriesLoaded,
        dataLoadErrorAC: categoriesLoadingError
    }
}

export function categoriesSearch(params) {
    return {
        type: API_REQUEST_ACTION,
        method: creator.MessageSearchCategories.SEARCH_METHOD,
        payload: params,
        beforeAC: (paramsContainer) => loadCategories(params.searchQuery || ''),
        successAC: categoriesLoaded,
        dataLoadErrorAC: categoriesLoadingError
    }
}

export function autoCompleteSearch(value, category_id) {
    return {
        type: API_REQUEST_ACTION,
        method: creator.MessageSearchAutoCompleteCategories.SEARCH_AUTOCOMPLETE_METHOD,
        payload: {value, category_id},
        beforeAC: (paramsContainer) => loadAutoComplete(),
        successAC: autoCompleteLoaded,
    }
}



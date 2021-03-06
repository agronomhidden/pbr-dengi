import {SET_CATEGORIES, SET_AUTO_COMPLETE, SUCCESS, START, FAIL, RESET, API_REQUEST_ACTION} from "../../CONSTANTS"
import {search} from './commonAC'
import * as creator from "../../Services/Api/Messages";
import {logoutCurrentUser} from "./authAC"

export const loadCategories = (searchQuery = '') => ({
    type: SET_CATEGORIES + START,
    payload: searchQuery
})

export const categoriesLoaded = (response) => ({
    type: SET_CATEGORIES + SUCCESS,
    payload: response
})

export const categoriesLoadingError = (xhr) => ({
    type: SET_CATEGORIES + FAIL,
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

export const fetchCategories = params => ({
    type: API_REQUEST_ACTION,
    method: params.searchQuery ? creator.MessageSearchCategories.METHOD : creator.MessageGetCategories.METHOD,
    payload: params,
    beforeAC: (paramsContainer) => loadCategories(params.searchQuery || ''),
    successAC: categoriesLoaded,
    dataLoadErrorAC: categoriesLoadingError,
    forbiddenErrorAC: logoutCurrentUser,
    observedAs: SET_CATEGORIES
})

export const autoCompleteSearch = (value, category_id) => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageSearchAutoCompleteCategories.METHOD,
    payload: {value, category_id},
    beforeAC: (paramsContainer) => loadAutoComplete(),
    successAC: autoCompleteLoaded,
})



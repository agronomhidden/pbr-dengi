import {SET_CATEGORIES, SET_AUTO_COMPLETE, SUCCESS, START, FAIL, RESET} from "../../CONSTANTS"
import {search} from './commonAC'

export const loadCategories = (searchQuery = '') => ({
    type: SET_CATEGORIES + START,
    searchQuery
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


import {SET_CATEGORIES, SET_AUTO_COMPLETE, SUCCESS, START, FAIL, RESET} from "../../CONSTANTS"
import {search} from './searchAC';

export const loadCategories = (searchQuery = '') => ({
    type: SET_CATEGORIES + START,
    searchQuery
})

export const categoriesLoaded = response => ({
    type: SET_CATEGORIES + SUCCESS,
    payload: response.data.result
})

export const categoriesSetSearch = data => dispatch => {
    dispatch(search(data));
}

export const setCategoriesErrors = _ => ({
    type: SET_CATEGORIES + FAIL,
})

export const loadAutoComplete = _ => ({
    type: SET_AUTO_COMPLETE + START,
})

export const autoCompleteLoaded = response => ({
    type: SET_AUTO_COMPLETE + SUCCESS,
    payload: response.data.result,
})

export const resetAutoComplete = _ => ({
    type: SET_AUTO_COMPLETE + RESET,
})


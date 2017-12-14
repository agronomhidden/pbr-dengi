import {SET_CATEGORIES, SUCCESS, START,FAIL} from "../../CONSTANTS"
import {search} from './searchAC';
import {getCategories} from '../Requests/categoriesRequest';
import {queryStringToState} from "../../Utils/helper"

export const loadCategories = () => ({
    type: SET_CATEGORIES + START
})

export const categoriesLoaded = response => ({
    type: SET_CATEGORIES + SUCCESS,
    payload:  response.data.result,
})

export const categoriesSetSearch = data => dispatch => {
    dispatch(search(data));
}

export const setCategoriesErrors = _ => ({
    type: SET_CATEGORIES + FAIL,
})
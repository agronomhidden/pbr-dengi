import {
    loadCategories, categoriesLoaded,
    loadAutoComplete, autoCompleteLoaded
} from '../AC/categoriesAC'
import MtsMoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"
import ErrorHandler from "../../Utils/ErrorHandler"

export const getCategories = params => dispatch => {
    dispatch(loadCategories())

    return MtsMoneyRequest
        .setMethod('categories/get')
        .setParams({parent_id: params.id})
        .withLocation()
        .postRequest()
        .then(res => res && res.data && dispatch(categoriesLoaded(res.data.result)))
}

export const categoriesSearch = params => dispatch => {
    dispatch(loadCategories(params.searchQuery));

    return MtsMoneyRequest
        .setMethod('search')
        .setParams({value: params.searchQuery, category_id: params.id})
        .withLocation()
        .postRequest()
        .then(res => res && res.data && dispatch(categoriesLoaded(res.data.result)))
}


export const autoCompleteSearch = (value, category_id) => dispatch => {
    dispatch(loadAutoComplete());

    return MtsMoneyRequest
        .setMethod('search/autocomplete-search')
        .setParams({value, category_id})
        .withLocation()
        .postRequest()
        .then(res => res && res.data && dispatch(autoCompleteLoaded(res.data.result)))
}
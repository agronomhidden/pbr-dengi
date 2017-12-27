import {get} from '../../Utils/ajaxWraper'
import {
    loadCategories, categoriesLoaded, setCategoriesErrors,
    loadAutoComplete, autoCompleteLoaded
} from '../AC/categoriesAC';

export const getCategories = params => dispatch => {
    dispatch(loadCategories())
    return get('api/categories/get', {parent_id: params.id}, res => {
        res && dispatch(categoriesLoaded(res))
    }, setCategoriesErrors, dispatch, false)

}


export const categoriesSearch = (params) => dispatch => {
    dispatch(loadCategories(params.searchQuery));
    return get('api/search', {
        value: params.searchQuery,
        category_id: params.id
    }, res => {
        res && dispatch(categoriesLoaded(res))
    }, setCategoriesErrors, dispatch, false)
};


export const autoCompleteSearch = (value, category_id) => dispatch => {
    dispatch(loadAutoComplete());
    return get('api/search/autocomplete-search', {value, category_id}, res => {
        res && dispatch(autoCompleteLoaded(res))
    }, setCategoriesErrors, dispatch, false)
};
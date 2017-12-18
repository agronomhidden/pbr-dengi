import {get} from '../../Utils/ajaxWraper'
import {
    loadCategories, categoriesLoaded, setCategoriesErrors,
    loadAutoComplete, autoCompleteLoaded
} from '../AC/categoriesAC';

export const getCategories = parent_id => dispatch => {
    dispatch(loadCategories())
    return get('api/categories/get', {parent_id}, res => {
        res && dispatch(categoriesLoaded(res))
    }, setCategoriesErrors, dispatch)

}


export const categoriesSearch = (searchQuery, category_id) => dispatch => {
    dispatch(loadCategories());
    return get('api/search', {
        value: searchQuery,
        category_id
    }, res => {
        res && dispatch(categoriesLoaded(res))
    }, setCategoriesErrors, dispatch)
};


export const autoCompleteSearch = (value, category_id) => dispatch => {
    dispatch(loadAutoComplete());
    return get('api/search/autocomplete-search', {value, category_id}, res => {
        res && dispatch(autoCompleteLoaded(res))
    }, setCategoriesErrors, dispatch)
};
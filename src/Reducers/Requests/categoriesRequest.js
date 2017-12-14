import {get} from '../../Utils/ajaxWraper'
import {loadCategories, categoriesLoaded, setCategoriesErrors} from '../AC/categoriesAC';

export const getCategories = (parent_id) => dispatch => {

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


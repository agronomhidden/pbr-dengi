import {get} from '../../Utils/ajaxWraper'
import {loadCategories, categoriesLoaded, setCategoriesErrors} from '../AC/categoriesAC';

export const getDefaultCategories = () => dispatch => {

    dispatch(loadCategories())

    return get('api/categories/get', {}, res => {
        res && dispatch(categoriesLoaded(res))
    }, setCategoriesErrors, dispatch)

}


export const categoriesSearch = (params) => dispatch => {

    dispatch(loadCategories());

    const search = {
        value: params.searchQuery,
        category_id: params.id
    }

    return get('api/search', search, res => {
        res && dispatch(categoriesLoaded(res))
    }, setCategoriesErrors, dispatch)
};


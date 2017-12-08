import {get} from '../../Utils/ajaxWraper'
import {loadCategories, categoriesLoaded, setCategoriesErrors} from '../AC/categoriesAC';

export const getCategories = (params = {}) => dispatch => {
    dispatch(loadCategories());

    const search = {
        value: params.searchQuery,
        parent_id: params.id
    }
    const URL = search.value ? 'api/search' : 'api/categories/get';

    return get(URL, search, res => {
        res && dispatch(categoriesLoaded(res))
    }, setCategoriesErrors, dispatch)
};


import {CHANGE_LOCATION, LOCATION_ID} from '../CONSTANTS'
import {loadLocation} from '../Reducers/AC/locationAC'
import {getCategories, categoriesSearch} from '../Reducers/AC/categoriesAC'

/**
 * Формирует параметры запроса для поиска категорий или загрузки категорий
 *
 * @param store
 */
function getParams(store) {
    const categories = store.getState().categories;
    const lastTarget = categories.get('targetCategoryPath').last();
    const id = lastTarget ? lastTarget.get('id') : null;
    const searchQuery = categories.get('searchValue') || '';
    return {
        id,
        searchQuery
    }
}

export default CookieManager => store => next => action => {
    const promises = [];
    if (action.type === CHANGE_LOCATION) {
        CookieManager.set(LOCATION_ID, action.payload, {expires: 9999});
        next(loadLocation(action.payload));

        const params = getParams(store);
        if (params.searchQuery) {
            promises.push( next(categoriesSearch(params)) )
        } else {
            promises.push( next(getCategories(params)) )
        }
    }

    Promise.all(promises).then(() => {
        next(action);
    }).catch(() => {
        next(action);
    })
}
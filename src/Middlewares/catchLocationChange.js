import {CHANGE_LOCATION, LOCATION_ID} from '../CONSTANTS'
import {loadLocation} from '../Reducers/AC/locationAC'
import {fetchCategories} from '../Reducers/AC/categoriesAC'
import {setUserLocations} from '../Reducers/AC/locationAC'

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

function hasUser(store) {
    return  !!store.getState().auth.get('user');
}

export default CookieManager => store => next => action => {
    const promises = [];
    if (action.type === CHANGE_LOCATION) {
        CookieManager.set(LOCATION_ID, action.payload, {expires: 9999});
        next(loadLocation(action.payload));

        const params = getParams(store);

        promises.push( next(fetchCategories(params)) )

        if (hasUser(store)) {
            promises.push( next(setUserLocations()) )
        }
    }

    Promise.all(promises).finally(() => {
        next(action);
    })
}
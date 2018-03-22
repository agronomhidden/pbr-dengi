import {CHANGE_ROUTE, TOUCH_LOCATION} from "../CONSTANTS"
import { getCategories, categoriesSearch } from '../Reducers/AC/accountsAC'

let lastPath = null;

function doLoadAccountSearch(store, path) {
    if (!path.match(/^\/accounts\/[0-9]+\//)) {
        return;
    }
    const [,, id, searchQuery] = path.split('/')
    if (!id) {
        return;
    }
    if (lastPath === path) {
        return;
    }
    lastPath = path

    setTimeout(() => {
        if (!searchQuery) {
            store.dispatch(getCategories({id, searchQuery}));
        } else {
            store.dispatch(categoriesSearch({id, searchQuery}))
        }
    }, 0)
}
/**
 * выполняет скролл в ТОП страницы, если произошел переход по ссылке.
 *
 * @param historyAction
 */
function scroll(historyAction) {
    if (historyAction !== 'POP') {
        window.scrollTo(0, 0);
    }
}

export default history => store => next => action => {

    if (action.type === TOUCH_LOCATION) {
        doLoadAccountSearch(store, action.payload.location.pathname)
    }

    if (action.type === CHANGE_ROUTE) {
        doLoadAccountSearch(store, action.payload.location.pathname)
        scroll(action.payload.action)

        history.location.state = CHANGE_ROUTE;
    }

    return next(action)
}

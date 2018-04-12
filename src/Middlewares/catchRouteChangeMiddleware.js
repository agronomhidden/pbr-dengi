import {CHANGE_ROUTE, TOUCH_LOCATION} from "../CONSTANTS"
import { getCategories, categoriesSearch } from '../Reducers/AC/accountsAC'
import {prepareParamsToRout} from "pbr-lib-front-utils/dist/queryStringHelper"

let lastPath = null;
/** @deprecated Костыль, Переделать на роуты и добавить наблюдателя */
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
/**
 * @param {RouteManager} RouteManager
 * @param history
 */
export default (RouteManager, history) => store => next => action => {

    switch (action.type) {
        case TOUCH_LOCATION : /** @todo этот костыль не понадобится */
            doLoadAccountSearch(store, action.payload.location.pathname)
            break
        case CHANGE_ROUTE:
            const Route = RouteManager.findFirst(action.payload.location.pathname)
            setTimeout(() => {
                for (action of Route.executeOnRouteChangeFetchData([prepareParamsToRout])) {
                    store.dispatch(action)
                }
            }, 0)

            doLoadAccountSearch(store, action.payload.location.pathname)
            scroll(action.payload.action)
            /** @todo этот костыль тоже не понадобится */
            history.location.state = history.location.pathname;
            break
    }

    return next(action)
}

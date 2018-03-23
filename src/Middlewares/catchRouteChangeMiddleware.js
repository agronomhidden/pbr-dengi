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

export default history => store => next => action => {

    switch (action.type) {
        case TOUCH_LOCATION :
            doLoadAccountSearch(store, action.payload.location.pathname)
            break
        case CHANGE_ROUTE:
            doLoadAccountSearch(store, action.payload.location.pathname)
            history.location.state = history.location.pathname;
            break
    }


    return next(action)
}

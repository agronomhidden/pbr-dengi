import {DIALOG, START} from "../CONSTANTS"
import {queryStringToState} from "pbr-lib-front-utils/dist/queryStringHelper"
import {getFavoriteItem} from "../Reducers/AC/favoritesAC"

export default history => store => next => action => {
    switch (action.type) {
        case DIALOG + START:
            const params = queryStringToState(history.location.search)
            if(params.favid){
                store.dispatch(getFavoriteItem(params))
            }
            break
    }
    return next(action)
}
import {DIALOG_DISTRIBUTOR, DIALOG, START} from '../CONSTANTS'
import {queryStringToState} from "pbr-lib-front-utils/dist/queryStringHelper"
import {getFavoriteItem} from "../Reducers/AC/favoritesAC"


export default history => store => next => action => {
    switch (action.type) {
        case DIALOG + START:
            const params = queryStringToState(history.location.search)
            if (params.favId) {
                store.dispatch(getFavoriteItem(params))
            }
            break
        case DIALOG_DISTRIBUTOR:
            if (action.payload.status === 'fail' && action.failAC) {
                next(action.failAC(action.payload))
                break
            }
            if (action.payload.advanced && action.overAC) {
                next(action.overAC(action.payload))
                break
            }
            if (action.successAC) {
                next(action.successAC(action.payload))
                break
            }
    }
    return next(action)
}

import {DIALOG_DISTRIBUTOR, DIALOG, START} from '../CONSTANTS'
import {queryStringToState} from "pbr-lib-front-utils/dist/queryStringHelper"
import {getFavoriteItem} from "../Reducers/AC/favoritesAC"
import {rechargeDialog} from "../Reducers/AC/payIvoicesAC"

export default ({push, location}) => ({dispatch}) => next => action => {
    switch (action.type) {
        case DIALOG + START:
            const {favId} = queryStringToState(location.search)
            if (favId) {
                dispatch(getFavoriteItem(params))
            }
            break
        case DIALOG_DISTRIBUTOR:
            if (action.payload.status === 'fail' && action.failAC) {
                next(action.failAC(action.payload))
                break
            }
            if (action.payload.advanced && action.overAC) {
                next(action.overAC())
                if (action.payload.advanced.direct_pay === false) {
                    dispatch(rechargeDialog(action.payload))
                    push(`/recharge-dialog`)
                } else {
                    push(`/history-items/${action.payload.uuid}`)
                }
                break
            }
            if (action.successAC) {
                next(action.successAC(action.payload))
                break
            }
    }
    return next(action)
}

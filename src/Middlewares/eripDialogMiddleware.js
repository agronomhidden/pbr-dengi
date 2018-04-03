import {DIALOG_DISTRIBUTOR, DIALOG, START} from '../CONSTANTS'
import {queryStringToState} from "pbr-lib-front-utils/dist/queryStringHelper"
import {getFavoriteItem} from "../Reducers/AC/favoritesAC"
import {rechargeDialog} from "../Reducers/AC/payIvoicesAC"
import {getInvoiceUserData} from "../Reducers/AC/accountsAC"

export default history => ({dispatch}) => next => action => {
    switch (action.type) {
        case DIALOG + START:
            const {favId, invoiceId} = queryStringToState(history.location.search)
            console.log(invoiceId);
            console.log(favId);
            favId && dispatch(getFavoriteItem({favId}))

            invoiceId && dispatch(getInvoiceUserData({invoiceId}))
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
                    history.push(`/recharge-dialog`)
                } else {
                    history.push(`/history-items/${action.payload.uuid}`)
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

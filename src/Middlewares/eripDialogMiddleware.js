import {DIALOG_DISTRIBUTOR} from '../CONSTANTS'

export default store => next => action => {
    switch (action.type) {
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

import {CREATE_USER_DATA_WITH_BANNER, PROCESS, SUCCESS} from '../CONSTANTS'
import {successCreateUserDataUsingBanner, failCreateUserDataUsingBanner} from '../Reducers/AC/accountsAC'

export default store => next => action => {
    if (action.type === CREATE_USER_DATA_WITH_BANNER + SUCCESS) {
        // тут будем перегружать списки.
    }
    return next(action);
}
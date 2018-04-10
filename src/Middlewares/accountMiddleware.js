import {CREATE_USER_DATA_WITH_BANNER, CREATE_USER_DATA, EDIT_USER_DATA, SUCCESS, DELETE_USER_DATA} from '../CONSTANTS'
import { pushLocation } from "../Reducers/AC/commonAC"
import { loadUserData, loadInvoices } from '../Reducers/AC/accountsAC'

export default store => next => action => {
    switch (action.type) {
        case CREATE_USER_DATA + SUCCESS:
        case EDIT_USER_DATA + SUCCESS:
            store.dispatch(pushLocation('/accounts'))

        case DELETE_USER_DATA + SUCCESS:
        case CREATE_USER_DATA_WITH_BANNER + SUCCESS:
            store.dispatch(loadUserData())
            store.dispatch(loadInvoices())
    }

    return next(action);
}
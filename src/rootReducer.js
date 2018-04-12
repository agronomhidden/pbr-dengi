import {combineReducers} from 'redux'
import auth from './Reducers/auth'
import common from './Reducers/common'
import categories from './Reducers/categories'
import eripDialog from './Reducers/eripDialog'
import location from './Reducers/location'
import payHistory from './Reducers/payHistory'
import mailSender from './Reducers/mailSender'
import settings from './Reducers/settings'
import help from './Reducers/help'
import accounts from './Reducers/accounts'
import assist from './Reducers/assist'
import favorites from './Reducers/favorites'
import payInvoices from './Reducers/payInvoices'


export default combineReducers({
    auth,
    categories,
    eripDialog,
    location,
    payHistory,
    mailSender,
    settings,
    help,
    favorites,
    accounts,
    assist,
    payInvoices,
    common
});
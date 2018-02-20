import {combineReducers} from 'redux'
import auth from './Reducers/auth'
import categories from './Reducers/categories'
import eripDialog from './Reducers/eripDialog'
import location from './Reducers/location'
import payHistory from './Reducers/payHistory'
import mailSender from './Reducers/mailSender'
import settings from './Reducers/settings'
import help from './Reducers/help'


export default combineReducers({
    auth,
    categories,
    eripDialog,
    location,
    payHistory,
    mailSender,
    settings,
    help
});
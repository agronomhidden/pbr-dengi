import {combineReducers} from 'redux'
import auth from './Reducers/auth'
import categories from './Reducers/categories'
import eripDialog from './Reducers/eripDialog'
import location from './Reducers/location'


export default combineReducers({
    auth,
    categories,
    eripDialog,
    location
});
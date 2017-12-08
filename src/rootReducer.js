import {combineReducers} from 'redux'
import auth from './Reducers/auth'
import categories from './Reducers/categories'


export default combineReducers({
    auth,
    categories
});
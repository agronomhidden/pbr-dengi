import {combineReducers} from 'redux'
import auth from './Reducers/auth'
import messenger from './Reducers/messenger'

export default combineReducers({
    auth,
    messenger
});
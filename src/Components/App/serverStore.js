import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../rootReducer'

export const getStore = (...middlewares) => createStore(rootReducer, applyMiddleware(thunk, ...middlewares));
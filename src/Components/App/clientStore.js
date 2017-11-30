import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../../rootReducer';
import {fromJSON} from 'transit-immutable-js';


export const store = createStore(
    rootReducer, fromJSON(window.__INITIAL_STATE__), composeWithDevTools(applyMiddleware(thunk))
);
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../../rootReducer';
import {fromJSON} from 'transit-immutable-js';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import setQueryString from "../../Middlewares/setQueryString"
import setStateLocation from "../../Middlewares/setStateLocation"


export const history = createBrowserHistory();

export const store = createStore(
    connectRouter(history)(rootReducer),
    fromJSON(window.__INITIAL_STATE__),
    composeWithDevTools(
        applyMiddleware(thunk, routerMiddleware(history), setQueryString(history),setStateLocation(history))
    )
);
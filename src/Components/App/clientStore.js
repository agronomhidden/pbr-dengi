import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../../rootReducer';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import setQueryString from "../../Middlewares/setQueryString"

export const history = createBrowserHistory();

export const getStore = (initialState, ...middlewares) => createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeWithDevTools(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
            setQueryString(history),
            ...middlewares
        )
    )
);
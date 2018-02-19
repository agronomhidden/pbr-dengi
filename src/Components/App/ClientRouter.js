import React from 'react';

import {ConnectedRouter} from 'connected-react-router'
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {fromJSON} from 'transit-immutable-js';
import {getStore, history} from './clientStore';
import routes from './routes';
import ErrorHandler from "../../Utils/ErrorHandler"
import {SERVER_POST_URL} from "../../CONSTANTS"
import cookies from "js-cookie"
import {logoutCurrentUser} from "../../Reducers/AC/authAC"
import apiCallerMiddleware from '../../Middlewares/apiCallerMiddleware'
import ClientApiParamsContainer from "../../Services/Api/ClientApiParamsContainer";


export default () => {
    const url = location.protocol + '//' + location.host + SERVER_POST_URL;
    const ParamsContainer = new ClientApiParamsContainer(url, cookies);
    const store = getStore(fromJSON(window.__INITIAL_STATE__), apiCallerMiddleware(ParamsContainer));

    /** @todo  разобраться */
    // ErrorHandler
    //     .setDispatcher(store.dispatch)
    //     .setLogoutHandler(logoutCurrentUser)

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {renderRoutes(routes)}
            </ConnectedRouter>
        </Provider>
    )
}

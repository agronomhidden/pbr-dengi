import React from 'react';

import {ConnectedRouter} from 'connected-react-router'
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {store, history} from './clientStore';
import routes from './routes';
import MoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"

import ErrorHandler from "../../Utils/ErrorHandler"
import {CLIENT_POST_URL, LOCATION_ID, TOKEN} from "../../CONSTANTS"
import cookies from "js-cookie"
import {logoutCurrentUser} from "../../Reducers/AC/authAC"


export default () => {

    MoneyRequest
        .setBaseUrl(location.protocol + '//' + location.host)
        .setUrl(CLIENT_POST_URL)
        .setToken(TOKEN, cookies.get(TOKEN))
        .setLocation(cookies.get(LOCATION_ID))
    ErrorHandler
        .setDispatcher(store.dispatch)
        .setLogoutHandler(logoutCurrentUser)

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {renderRoutes(routes)}
            </ConnectedRouter>
        </Provider>
    )
}

import React from 'react';

import {ConnectedRouter} from 'connected-react-router'
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {store, history} from './clientStore';
import routes from './routes';
import MoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"
import AdminMoneyRequest from "../../Utils/RequestApi/AdminMoneyRequest"
import ErrorHandler from "../../Utils/ErrorHandler"
import {TOKEN} from "../../CONSTANTS"
import cookies from "js-cookie"


export default () => {

    MoneyRequest
        .setBaseUrl(location.protocol + '//' + location.host)
        .setUrl('/api')
    //.setAccessToken(cookies.get(TOKEN))


    AdminMoneyRequest
        .setBaseUrl(process.env.API_URL)
        .setToken(TOKEN, cookies.get(TOKEN))

    ErrorHandler.setDispatcher(store.dispatch)

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {renderRoutes(routes)}
            </ConnectedRouter>
        </Provider>
    )
}

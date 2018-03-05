import React from 'react';

import {ConnectedRouter} from 'connected-react-router'
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {fromJSON} from 'transit-immutable-js';
import {getStore, history} from './clientStore';
import routes from './routes';
import {SERVER_POST_URL} from "../../CONSTANTS"
import cookies from "js-cookie"
import apiCallerMiddleware from '../../Middlewares/apiCallerMiddleware'
import catchLocationChange from '../../Middlewares/catchLocationChange'
import catchUserLogin from '../../Middlewares/catchUserLogin'
import setTokenMiddleware from '../../Middlewares/setTokenMiddleware'
import accountMiddleware from '../../Middlewares/accountMiddleware'
import ClientApiParamsContainer from "../../Services/Api/ClientApiParamsContainer";


export default () => {
    const url = location.protocol + '//' + location.host + SERVER_POST_URL;
    const ParamsContainer = new ClientApiParamsContainer(url, cookies);
    const store = getStore(fromJSON(window.__INITIAL_STATE__),
        catchLocationChange(cookies),
        apiCallerMiddleware(ParamsContainer),
        catchUserLogin,
        setTokenMiddleware(cookies),
        accountMiddleware
    );

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {renderRoutes(routes)}
            </ConnectedRouter>
        </Provider>
    )
}

import React from 'react';

import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux';
import {fromJSON} from 'transit-immutable-js';
import {getStore, history} from './clientStore';
import routes from './routes';
import RouteManager from '../../Services/Route/RouteManager'
import catchRouteChangeMiddleware from "../../Middlewares/catchRouteChangeMiddleware"

import {SERVER_POST_URL} from "../../CONSTANTS"
import cookies from "js-cookie"
import apiCallerMiddleware from '../../Middlewares/apiCallerMiddleware'
import catchLocationChange from '../../Middlewares/catchLocationChange'
import ClientApiParamsContainer from "../../Services/Api/ClientApiParamsContainer";
import accountMiddleware from '../../Middlewares/accountMiddleware'
import catchUserActionMiddleware from "../../Middlewares/catchUserActionMiddleware"
import settingMiddleware from "../../Middlewares/settingMiddleware"
import eripDialogMiddleware from "../../Middlewares/eripDialogMiddleware"
import catchFavorite from "../../Middlewares/catchFavorite"
import catchAddFavorite from "../../Middlewares/catchAddFavorite"
import catchAssistRequestMiddleware from "../../Middlewares/catchAssistRequestMiddleware"

const routeManager = new RouteManager(routes);
/** @todo теперь routeManager можно передавать в миделвару и работать с путями */

export default () => {
    const url = location.protocol + '//' + location.host + SERVER_POST_URL;
    const ParamsContainer = new ClientApiParamsContainer(url, cookies);

    const store = getStore(
        fromJSON(window.__INITIAL_STATE__),
        catchRouteChangeMiddleware(routeManager, history),
        catchLocationChange(cookies),
        apiCallerMiddleware(ParamsContainer),
        catchUserActionMiddleware(history, cookies),
        catchAssistRequestMiddleware,
        eripDialogMiddleware(history),
        settingMiddleware,
        catchAddFavorite,
        catchFavorite,
        accountMiddleware)

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {routeManager.renderRoutes()}
            </ConnectedRouter>
        </Provider>
    )
}

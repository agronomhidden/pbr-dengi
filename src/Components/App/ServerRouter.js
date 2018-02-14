import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import StaticRouter from 'react-router-dom/StaticRouter'
import {renderRoutes, matchRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import {store} from './serverStore'
import Layout from '../../layout'
import routes from './routes'
import {prepareParamsToRout} from "pbr-lib-front-utils/dist/queryStringHelper"
import {TOKEN, MOBILE, BROWSER, LOCATIONID, REAL_IP,SERVER_POST_URL} from '../../CONSTANTS'
import {getUserByToken} from '../../Reducers/Requests/authRequest'
import {getLocation} from '../../Reducers/Requests/locationRequest'
import requestIp from 'request-ip';
import MobileDetect from 'mobile-detect'
import ErrorHandler from "../../Utils/ErrorHandler"
import MoneyRequest from "../../Utils/RequestApi/MtsMoneyRequest"
import {logoutCurrentUser} from "../../Reducers/AC/authAC"

const router = express.Router();

router.get('*', (req, res) => {

    const {url, cookies, headers} = req,

        ip = requestIp.getClientIp(req),

        token = cookies[TOKEN],

        version = new MobileDetect(headers['user-agent']).mobile() ? MOBILE : BROWSER,

        branch = matchRoutes(routes, url),

        locationId = cookies[LOCATIONID]

    Layout.setStore(store)

    MoneyRequest
        .setHeader({[REAL_IP]: ip})
        .setBaseUrl(process.env.API_URL)
        .setUrl(SERVER_POST_URL)
        .setToken(TOKEN, token)

    ErrorHandler
        .setDispatcher(store.dispatch)
        .setLogoutHandler(logoutCurrentUser)


    store.dispatch(getUserByToken()).then(() => {

        const user = store.getState().auth.user,
            promises = []

        branch.some(({route: {fetchData, needAuth}, match: {params}}) => {
            if (needAuth && !user) {
                res.redirect('/')
                return true;
            }
            promises.push(store.dispatch(getLocation(locationId)))

            if (fetchData instanceof Function) {
                promises.push(store.dispatch(fetchData(prepareParamsToRout(params))))
            }
            if (fetchData instanceof Array) {
                fetchData.forEach(fetchFunction => {
                    if (fetchFunction instanceof Function) {
                        promises.push(store.dispatch(fetchFunction(prepareParamsToRout(params))))
                    }
                })
            }
        })

        Promise.all(promises).then(() => {
            const context = {
                pageTitleSetter: (title) => {
                    Layout.setTitle(title)
                }, setNotFound: () => {
                    res.status(404)
                }
            };

            const content = renderToString(
                <Provider store={store}>
                    <StaticRouter location={url} context={context}>
                        {renderRoutes(routes)}
                    </StaticRouter>
                </Provider>
            );

            res.end(Layout.render(content));
        }).catch(err => {
            console.log('error on PromiseAll')
            console.log('ServerRouter.err =>',err);
            if (err && err.response && err.response.status === 404) {
                res.redirect('/not-found');
            }
        });
    });
});

export default router;

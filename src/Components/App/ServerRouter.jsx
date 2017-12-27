import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import StaticRouter from 'react-router-dom/StaticRouter'
import {renderRoutes, matchRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import {store} from './serverStore'
import Layout from '../../layout'
import routes from './routes'
import {prepareParams, setQueryStringToRoute} from '../../Utils/helper'
import {TOKEN, REAL_IP, MOBILE, BROWSER} from '../../CONSTANTS'
import {getUserByToken} from '../../Reducers/Requests/loginCurrentUserRequest'
import requestIp from 'request-ip';
import axios from 'axios'
import MobileDetect from 'mobile-detect'

const router = express.Router();

router.get('*', (req, res) => {

    const {url, cookies, headers} = req;

    axios.defaults.headers.common[REAL_IP] = requestIp.getClientIp(req)

    Layout.setStore(store);


    const branch = matchRoutes(routes, url);

    const token = cookies[TOKEN];

    const md = new MobileDetect(headers['user-agent']);

    const version = md.mobile() ? MOBILE : BROWSER;


    store.dispatch(getUserByToken(token)).then(() => {

        const user = store.getState().auth.user
        const promises = [];

        branch.some(({route: {fetchData, needAuth},match, match: {params}}) => {
            if (needAuth && !user) {
                res.redirect('/')
                return true;
            }

            if (fetchData instanceof Function) {
                promises.push(store.dispatch(fetchData(prepareParams(params))))
            }

            if (fetchData instanceof Array) {
                fetchData.forEach(fetchFunction => {
                    if (fetchFunction instanceof Function) {
                        promises.push(store.dispatch(fetchFunction(prepareParams(params))));
                    }
                })
            }
        })

        Promise.all(promises).then(() => {
            const context = {
                pageTitleSetter: (title) => {
                    Layout.setTitle(title)
                }, setNotFound: () => {
                    console.log(404);
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
            console.log('error on PromiseAll');
            console.log(err)
            if (err && err.response.status === 404) {
                res.redirect('/not-found');
            }
        });
    });
});

export default router;

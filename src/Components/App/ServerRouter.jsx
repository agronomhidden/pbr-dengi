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
import {TOKEN} from '../../CONSTANTS'
import {getUserByToken} from '../../Reducers/Requests/loginCurrentUserRequest'
import requestIp from 'request-ip';
import axios from 'axios'
import MobileDetect  from 'mobile-detect'
    
const router = express.Router();

router.get('*', (req, res) => {

    axios.defaults.headers.common['X-Real-IP'] = requestIp.getClientIp(req)

    Layout.setStore(store);

    const branch = matchRoutes(setQueryStringToRoute(routes, req.url), req.url);

    const token = req.cookies[TOKEN];

    const md = new MobileDetect(req.headers['user-agent']);

    const version = md.mobile() ? 'mobile' : 'browser';

    store.dispatch(getUserByToken(token)).then(() => {

        const user = store.getState().auth.user
        const promises = branch.map(({route: {fetchData, needAuth}, match: {params}}) => {
            if (needAuth && !user) {
                res.redirect('/');
                return Promise.resolve(null);
            }
            return fetchData instanceof Array ? fetchData.map(fetchFunction => store.dispatch(fetchFunction(prepareParams(params)))) : Promise.resolve(null);
        });

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
                    <StaticRouter location={req.url} context={context}>
                        {renderRoutes(routes)}
                    </StaticRouter>
                </Provider>
            );
            res.end(Layout.render(content));
        }).catch(err => {
            console.log('error on PromiseAll');
            console.log(err)
        });
    });
});

export default router;

import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import StaticRouter from 'react-router-dom/StaticRouter'
import {renderRoutes, matchRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import {store} from './serverStore';
import Layout from '../../layout'
import routes from './routes'
import {prepareParams} from '../../Utils/helper'
import {TOKEN} from '../../CONSTANTS'
import {getUserByToken} from "../../Reducers/Requests/loginCurrentUserRequest"


const router = express.Router();

router.get('*', (req, res) => {

    Layout.setStore(store);

    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({route: {fetchData}, match: {params}}) => {
        return fetchData instanceof Function ? store.dispatch(fetchData(prepareParams(params))) : Promise.resolve(null)
    });


    req.cookies[TOKEN] && promises.push(store.dispatch(getUserByToken(req.cookies[TOKEN])));

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

export default router;

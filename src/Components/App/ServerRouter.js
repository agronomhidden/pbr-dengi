import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import StaticRouter from 'react-router-dom/StaticRouter'
import {renderRoutes, matchRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import {getStore} from './serverStore'
import LayoutFactory from '../../Services/Factories/LayoutFactory'
import routes from './routes'
import {prepareParamsToRout} from "pbr-lib-front-utils/dist/queryStringHelper"
import {getUserByToken} from '../../Reducers/AC/authAC'
import {getLocations} from '../../Reducers/AC/locationAC'

import apiCallerMiddleware from "../../Middlewares/apiCallerMiddleware"
import ServerApiParamsContainer from '../../Services/Api/ServerApiParamsContainer'

const router = express.Router();

/** Для определяния версии устройства
   import MobileDetect from 'mobile-detect'
   import {MOBILE, BROWSER} from '../../CONSTANTS'
   const version = new MobileDetect(req.headers['user-agent']).mobile() ? MOBILE : BROWSER
 */


router.get('*', (req, res) => {
    const {url} = req;
    const ParamsContainer = new ServerApiParamsContainer(process.env.API_URL, req);
    const store = getStore(apiCallerMiddleware(ParamsContainer));

    const Layout = LayoutFactory.getLayout();
    Layout.setStore(store);

    store.dispatch(getUserByToken()).then(() => {

        const user = store.getState().auth.user,
            promises = []

        matchRoutes(routes, url).some(({route: {fetchData, needAuth}, match: {params}}) => {
            if (needAuth && !user) {
                res.redirect('/')
                return true;
            }
            promises.push(store.dispatch(getLocations()))

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

            res.end(Layout.render(content))
        }).catch(err => {
            console.log('ServerRouter.err =>', err)
            if (err && err.response && err.response.status === 404) {
                res.redirect('/not-found');
            }
        });
    });
});

export default router;

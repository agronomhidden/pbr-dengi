import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import StaticRouter from 'react-router-dom/StaticRouter'
import {renderRoutes, matchRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import {getStore} from './serverStore'
import LayoutFactory from '../../Services/Factories/LayoutFactory'
import routes from './routes'

import {getUserByToken, setUserDevice} from '../../Reducers/AC/authAC'
import {getLocations} from '../../Reducers/AC/locationAC'

import apiCallerMiddleware from "../../Middlewares/apiCallerMiddleware"
import ServerApiParamsContainer from '../../Services/Api/ServerApiParamsContainer'
import {prepareParamsToRout} from "pbr-lib-front-utils/dist/queryStringHelper"
import MobileDetectedFactory from "../../Services/Factories/MobileDetectedFactory"

const router = express.Router();

router.get('*', (req, res) => {

    const ParamsContainer = new ServerApiParamsContainer(process.env.API_URL, req);
    const store = getStore(apiCallerMiddleware(ParamsContainer));

    store.dispatch(getUserByToken()).then(() => {

        const user = store.getState().auth.user,
            promises = []

        matchRoutes(routes, req.url).some(({route: {fetchData, needAuth}, match: {params}}) => {

            if (needAuth && !user) {
                res.redirect('/')
                return true;
            }

            promises.push(store.dispatch(getLocations()))
            promises.push(store.dispatch(setUserDevice(MobileDetectedFactory.getOs())))

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

        const Layout = LayoutFactory.getLayout();
        Layout.setStore(store);

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

            res.end(Layout.render(content))
        }).catch(err => {
            if (err && err.response && err.response.status === 404) {
                res.redirect('/not-found');
            }
            res.end(err)
        });
    });
});

export default router;

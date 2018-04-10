import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import StaticRouter from 'react-router-dom/StaticRouter'
import {Provider} from 'react-redux'
import {getStore} from './serverStore'
import LayoutFactory from '../../Services/Factories/LayoutFactory'
import routes from './routes'
import RouteManager from '../../Services/Route/RouteManager'

import {getUserByToken, setUserDevice} from '../../Reducers/AC/authAC'
import {getLocations} from '../../Reducers/AC/locationAC'

import apiCallerMiddleware from "../../Middlewares/apiCallerMiddleware"
import ServerApiParamsContainer from '../../Services/Api/ServerApiParamsContainer'
import {prepareParamsToRout} from "pbr-lib-front-utils/dist/queryStringHelper"
import MobileDetectedFactory from "../../Services/Factories/MobileDetectedFactory"

const router = express.Router();
const routeManager = new RouteManager(routes);

router.get('*', (req, res) => {

    const ParamsContainer = new ServerApiParamsContainer(process.env.API_URL, req);
    const store = getStore(apiCallerMiddleware(ParamsContainer));
    const Layout = LayoutFactory.getLayout();
    const context = {
        pageTitleSetter: (title) => Layout.setTitle(title),
        setNotFound: () => res.status(404)
    }

    Layout.setStore(store);

    store.dispatch(getUserByToken()).then(() => {

        const promises = []
        const user = store.getState().auth.user;
        const Route = routeManager.findFirst(req.url);

        if (Route.isAuthNeeded() && !user) {
            res.redirect('/')
            return true;
        }
        promises.push(store.dispatch(getLocations()))
        promises.push(store.dispatch(setUserDevice(MobileDetectedFactory.getOs())))

        for (let action of Route.executeFetchActions([prepareParamsToRout])) {
            promises.push(store.dispatch(action))
        }

        Promise.all(promises).then(() => {
            const content = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        {routeManager.renderRoutes()}
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

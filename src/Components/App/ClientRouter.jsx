import React from 'react';


import {BrowserRouter} from 'react-router-dom';
// import {ConnectedRouter} from 'connected-react-router'
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {store, history} from './clientStore';
import routes from './routes';


export default () => {
    return (
        <Provider store={store}>
            <BrowserRouter history={history}>
                {renderRoutes(routes)}
            </BrowserRouter>
        </Provider>
    )
}

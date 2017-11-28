import React from 'react';


import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import {store} from './clientStore';
import routes from './routes';



export default () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                {renderRoutes(routes)}
            </BrowserRouter>
        </Provider>
    )
}

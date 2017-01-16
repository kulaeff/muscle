import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import API from './api';
import configureStore from './configureStore'
import configureRoutes from './configureRoutes';
import './index.less';

const
    store = configureStore(new API()),
    routes = configureRoutes(),
    history = syncHistoryWithStore(browserHistory, store),
    __svg__ = { name: './assets/icons.svg', path: './**/*.svg' }

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
)

if (process.env.NODE_ENV === 'production') {
    console.info(`Version: ${process.env.VERSION}`)
}

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
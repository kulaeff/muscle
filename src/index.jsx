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

const store = configureStore(new API())
const routes = configureRoutes();

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
)

const __svg__           = { path: './**/*.svg', name: 'icons.svg' };

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
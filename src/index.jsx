import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'
import API from './api';
import App from './containers/App';
import './index.less';

const
    history = createHistory(),
    middleware = routerMiddleware(history),
    store = createStore(
        reducers,
        applyMiddleware(
            middleware,
            thunk.withExtraArgument(new API())
        )
    );

// eslint-disable-next-line prefer-const
let __svg__ = { name: './assets/icons.svg', path: './**/*.svg' };

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

/*if (env === 'production') {
    console.info(`Version: ${version}`)
}*/

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
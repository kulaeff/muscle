import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Redirect, Switch } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'
import API from './api';
import App from './containers/App';
import Column from './containers/Column';
import Table from './containers/Table';
import Server from './containers/Server';
import Settings from './containers/Settings';
import Status from './containers/Status';
import StatusConnections from './containers/Status/Connections';
import StatusSummary from './containers/Status/Summary';
import StatusUsage from './containers/Status/Usage';
import Database from './containers/Database';
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
            <Route exact path="/" component={App}>
                /*<Switch>
                    <Route path="server" component={Server}>
                        <Route path=":database" component={Database}>
                            <Route path=":table" component={Table}>
                                <Route path=":column" component={Column} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="settings" component={Settings} />
                    <Route path="status" component={Status}>
                        <Redirect from="status" to="status/summary" />
                        <Route path="connections" component={StatusConnections} />
                        <Route path="summary" component={StatusSummary} />
                        <Route path="usage" component={StatusUsage} />
                    </Route>
                </Switch>*/
            </Route>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

/*if (env === 'production') {
    console.info(`Version: ${version}`)
}*/

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
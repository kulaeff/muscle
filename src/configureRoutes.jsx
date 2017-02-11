import React from 'react';
import { Route, IndexRedirect } from 'react-router';
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

export default function createRoutes () {
    return (
        <Route path="/" component={App}>
            <Route path="server" component={Server}>
                <Route path=":database" component={Database}>
                    <Route path=":table" component={Table}>
                        <Route path=":column" component={Column} />
                    </Route>
                </Route>
            </Route>
            <Route path="settings" component={Settings} />
            <Route path="status" component={Status}>
                <IndexRedirect to="summary" />
                <Route path="connections" component={StatusConnections} />
                <Route path="summary" component={StatusSummary} />
                <Route path="usage" component={StatusUsage} />
            </Route>
       </Route>
    );
}
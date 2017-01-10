import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Column from './containers/Column';
import Columns from './containers/Columns';
import Databases from './containers/Databases';
import Settings from './containers/Settings';
import Status from './containers/Status';
import Tables from './containers/Tables';

export default function createRoutes () {
    return (
        <Route path="/" component={App}>
            <IndexRedirect to="databases" />
            <Route path="databases" component={Databases}>
                <Route path=":database" component={Tables}>
                    <Route path=":table" component={Columns}>
                        <Route path=":column" component={Column} />
                    </Route>
                </Route>
            </Route>
            <Route path="settings" component={Settings} />
            <Route path="status" component={Status} />
       </Route>
    );
}
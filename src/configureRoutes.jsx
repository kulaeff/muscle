import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Databases from './containers/Databases';
import Status from './containers/Status';
import Tables from './containers/Tables';

export default function createRoutes () {
    return (
        <Route path="/" component={App}>
            <IndexRedirect to="databases" />
            <Route path="databases" component={Databases}>
                <Route path=":database" component={Tables}/>
            </Route>
            <Route path="status" component={Status} />
       </Route>
    );
}
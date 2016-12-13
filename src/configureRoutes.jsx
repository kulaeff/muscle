import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Databases from './containers/Databases';
import Summary from './containers/Summary';

export default function createRoutes () {
    return (
        <Route path="/" component={App}>
            <IndexRedirect to="summary" />
            <Route path="databases" component={Databases} />
            <Route path="summary" component={Summary} />
       </Route>
    );
}
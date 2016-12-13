import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Browse from './containers/Browse';
import Summary from './containers/Summary';

export default function createRoutes () {
    return (
        <Route path="/" component={App}>
            <IndexRedirect to="summary" />
            <Route path="browse" component={Browse} />
            <Route path="summary" component={Summary} />
       </Route>
    );
}
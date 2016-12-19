import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Browse from './containers/Browse';
import Status from './containers/Status';

export default function createRoutes () {
    return (
        <Route path="/" component={App}>
            <IndexRedirect to="browse" />
            <Route path="browse" component={Browse} />
            <Route path="status" component={Status} />
       </Route>
    );
}
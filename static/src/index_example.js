import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/es/Router';
import browserHistory from 'react-router/lib/browserHistory';
import routes from './js_examples/routes';

render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('app')
);

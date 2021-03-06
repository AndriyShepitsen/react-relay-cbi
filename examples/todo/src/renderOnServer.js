import GraphQLStoreChangeEmitter from 'react-relay/lib/GraphQLStoreChangeEmitter';
import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
import {match, RoutingContext} from 'react-router';
import routes from './routes';

const GRAPHQL_URL = `http://localhost:8080/graphql`;

Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(GRAPHQL_URL));

GraphQLStoreChangeEmitter.injectBatchingStrategy(() => {});

export default (req, res, next) => {
    match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
        if (error) {
            next(error);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            IsomorphicRouter.prepareData(renderProps).then(render, next);
        } else {
            res.status(404).send('Not Found');
        }

        function render(data) {
            const reactOutput = ReactDOMServer.renderToString(
                <IsomorphicRouter.RoutingContext {...renderProps} />
            );
            res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), {
                preloadedData: JSON.stringify(data),
                reactOutput
            });
        }
    });
};

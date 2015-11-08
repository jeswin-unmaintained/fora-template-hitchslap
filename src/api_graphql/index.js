import { Schema } from '../data/schema';

export default { Schema };

/*

import store from "./store";

import koa from 'koa';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';

const GRAPHQL_PORT = 8080;

var app = koa();
app.use(mount('/graphql', graphqlHTTP({ schema: Schema, pretty: true })));
app.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
*/

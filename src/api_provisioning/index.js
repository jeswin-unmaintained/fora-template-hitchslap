import store from "./store";

export default [
    { url: "graphql", handler: graphqlHTTP({ schema: Schema, pretty: true }) }
];

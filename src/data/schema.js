import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
} from 'graphql-relay';

import {
    // Import methods that your schema can use to interact with your database
    User,
    Template,
    getUser,
    getViewer,
    getTemplate,
    getTemplates,
} from './database';


const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        if (type === 'User') {
            return getUser(id);
        } else if (type === 'Template') {
            return getTemplate(id);
        } else {
            return null;
        }
    },
    (obj) => {
        if (obj instanceof User) {
            return userType;
        } else if (obj instanceof Template)  {
            return templateType;
        } else {
            return null;
        }
    }
);

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'A person who uses our app',
    fields: () => ({
        id: globalIdField('User'),
        templates: {
            type: templateConnection,
            description: 'Templates created by the user',
            args: connectionArgs,
            resolve: (_, args) => connectionFromArray(getTemplates(), args),
        },
    }),
    interfaces: [nodeInterface],
});

const templateType = new GraphQLObjectType({
    name: 'Template',
    description: 'A shiny template',
    fields: () => ({
        id: globalIdField('Template'),
        name: {
            type: GraphQLString,
            description: 'The name of the template',
        },
    }),
    interfaces: [nodeInterface],
});


const {connectionType: templateConnection} = connectionDefinitions({name: 'Template', nodeType: templateType});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        // Add your own root fields here
        user: {
            type: userType,
            resolve: () => getUser(),
        },
    }),
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        // Add your own mutations here
    })
});

export const Schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

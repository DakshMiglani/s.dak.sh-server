import { GraphQLServer } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import { join } from 'path';
import { Resolvers as resolvers } from './graphql/resolvers';

export const opts = {
	formatError,
	port: 4000,
	endpoint: '/graphql',
};

export const Server = new GraphQLServer({
	resolvers,
	typeDefs: join(__dirname, './graphql/schema.graphql'),
});

import { GraphQLServer } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import { join } from 'path';
import * as helmet from 'helmet';
import { Resolvers as resolvers } from './graphql/resolvers';
import router from './routes';

export const opts = {
	formatError,
	port: 4000,
	endpoint: '/graphql',
	playground: false,
};

export const Server = new GraphQLServer({
	resolvers,
	typeDefs: join(__dirname, './graphql/schema.graphql'),
});

Server.express.use('/', router);
Server.express.use(helmet());

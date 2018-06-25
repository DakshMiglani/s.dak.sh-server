import { GraphQLServer } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import { join } from 'path';
import * as helmet from 'helmet';
import * as RateLimit from 'express-rate-limit';
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

Server.express.use(helmet());
Server.express.use(new RateLimit({
	windowMs: 10 * 1000 * 60, // 10 minute window
	max: 100, // 100 requests per windowMs
	delayMs: 0,
	message: 'Too many requests created from this IP, please try again after 10 minutes.',
}));

Server.express.use('/', router);

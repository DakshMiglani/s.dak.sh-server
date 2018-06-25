import { Server, opts } from './server';
import * as mongoose from 'mongoose';

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/db').then(
	() => Server.start(opts as any, () => console.log(`Server is running at: http://localhost:${opts.port}`)),
	(err) => console.error(`A mongoose error has occured: ${err}`)
)


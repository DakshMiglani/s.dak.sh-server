import { ResolverMap } from './types';
import { Model } from '../models/url';
import { createError } from 'apollo-errors';
import { isURL } from 'validator';

const Error = createError('Error', {
	message: 'An Error has occured.'
})

export const Resolvers: ResolverMap = {
	Query: {
		getDetails: async (_, { uuid }) => {
			const URL = await Model.findOne({ uuid });

			if (URL) {
				return URL;
			}

			throw new Error({
				data: {
					message: 'URL Not Found.'
				}
			})
		},
	},
	Mutation: {
		create: async (_, { redirectTo, createdBy }) => {
			if (!isURL(redirectTo)) {
				throw new Error({
					data: {
						message: 'The URL is Invalid.',
					},
				});
			}

			const URL = new Model({
				redirectTo,
				createdBy,
			});

			try {
				await URL.save();
			} catch (e) {
				throw new Error({
					data: {
						message: 'An Internal Error has occured, please inform at hello@dak.sh'
					}
				})
			}

			return URL;
		},
	}
};


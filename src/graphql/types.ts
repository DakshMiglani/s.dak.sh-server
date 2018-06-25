export type Resolver = (_: any, args: any, ctx: any, info: any) => any;

export interface ResolverMap {
	[key: string]: {
		[key: string]: Resolver,
	},
};

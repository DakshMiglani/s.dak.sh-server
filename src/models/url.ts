import { prop, Typegoose } from 'typegoose';
import * as shortid from 'shortid';

class URL extends Typegoose {
	@prop({ required: true, unique: true, default: shortid.generate })
		uuid: string;
	@prop({ required: true })
		redirectTo: string;
	@prop({ required: true, default: 0})
		views: number;
	@prop()
		createdBy: string;
}

export const Model = new URL().getModelForClass(URL, {
	schemaOptions: {
		timestamps: true,
	},
});

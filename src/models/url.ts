import { prop, Typegoose, post } from "typegoose";
import * as shortid from "shortid";

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-');

@post<URL>("findOne", async function(result) {
  await result.update({ views: result.views + 1 });
})
class URL extends Typegoose {
  @prop({ required: true, unique: true, default: shortid.generate })
  uuid: string;
  @prop({ required: true })
  redirectTo: string;
  @prop({ required: true, default: 0 })
  views: number;
  @prop() createdBy: string;
}

export const Model = new URL().getModelForClass(URL, {
  schemaOptions: {
    timestamps: true
  }
});

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppealDocument = HydratedDocument<AppealModel>;

@Schema()
export class AppealModel {
	@Prop()
	appeal: string;
	@Prop()
	phoneNumber: number;
}
export const AppealSchema = SchemaFactory.createForClass(AppealModel);

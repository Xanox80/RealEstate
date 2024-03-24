import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppealDocument = HydratedDocument<Appeal>;

@Schema()
export class Appeal {
	@Prop()
	appeal: string;
	@Prop()
	phoneNumber: number;
}
export const AppealSchema = SchemaFactory.createForClass(Appeal);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VillaDocument = HydratedDocument<Villa>;

@Schema()
export class Villa {
	@Prop()
	Name: string;

	@Prop()
	Surname: string;

	@Prop()
	price: number;

	@Prop()
	residence: string;
}

export const VillaSchema = SchemaFactory.createForClass(Villa);

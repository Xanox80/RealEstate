import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VillaDocument = HydratedDocument<VillaModel>;

@Schema()
export class VillaModel {
	@Prop()
	Name: string;

	@Prop()
	Surname: string;

	@Prop()
	price: number;

	@Prop()
	residence: string;
}

export const VillaSchema = SchemaFactory.createForClass(VillaModel);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApartmentDocument = HydratedDocument<Apartmen>;

@Schema()
export class Apartmen {
	@Prop()
	Name: string;

	@Prop()
	Surname: string;

	@Prop()
	price: number;

	@Prop()
	residence: string;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartmen);

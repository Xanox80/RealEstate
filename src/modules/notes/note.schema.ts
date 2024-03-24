import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
	@Prop()
	Name: string;

	@Prop()
	Surname: string;

	@Prop()
	price: number;

	@Prop()
	residence: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

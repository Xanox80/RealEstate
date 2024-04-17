import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhotoDocument = HydratedDocument<Photo>;

@Schema()
export class Photo {
	@Prop({ required: true })
	photoBase64: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);

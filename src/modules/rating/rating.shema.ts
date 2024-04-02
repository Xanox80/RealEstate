import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type RatingDocument = HydratedDocument<Rating>;
@Schema()
export class Rating {
	@Prop({ required: true })
	objectId: string;

	@Prop({ required: true })
	rating: number;

	@Prop()
	count: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

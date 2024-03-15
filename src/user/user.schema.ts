import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop()
	username: string;

	@Prop()
	password: string;

	@Prop()
	access_token?: string;

	@Prop()
	refresh_token?: string;

	@Prop()
	roleId?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

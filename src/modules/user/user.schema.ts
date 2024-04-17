import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RolesEnum } from '../../enum/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop()
	id: string;

	@Prop()
	username: string;

	@Prop()
	password: string;

	@Prop()
	number: number;

	@Prop()
	access_token?: string;

	@Prop()
	refresh_token?: string;

	@Prop()
	role: RolesEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);

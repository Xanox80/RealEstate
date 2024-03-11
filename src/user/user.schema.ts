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

// import mongoose, { Document, Schema, Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';

// // Define the interface for the User document
// export interface UserDocument extends Document {
//   username: string;
//   password: string;
// }

// // Define the User schema with type annotations
// const userSchema = new Schema<UserDocument>({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Middleware to hash the password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   try {
//     const hashedPassword = await bcrypt.hash(this.get('password'), 10);
//     this.set('password', hashedPassword);
//     next();
//   } catch (error) {}
// });

// // Define the User model with type annotations
// export const User: Model<UserDocument> = mongoose.model('User', userSchema);

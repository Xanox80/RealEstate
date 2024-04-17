import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserDocument } from 'src/modules/user/user.schema';

export interface RoleDocument extends Document {
	name: string;
	users: UserDocument[];
}

const roleSchema = new Schema({
	name: { type: String, required: true },
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const RoleModel: Model<RoleDocument> = mongoose.model<RoleDocument>(
	'Role',
	roleSchema
);

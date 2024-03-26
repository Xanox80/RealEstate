import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../modules/user/user.schema';
import { UserRequestDto } from 'src/common/dto/user/request/user-request.dto';
import { UserUpdateRequestDto } from 'src/common';
import * as bcrypt from 'bcrypt';
const dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async findByParams(params: Record<string, any>): Promise<User> {
		return await this.userModel.findOne(params);
	}

	async createUser(userParams: UserRequestDto): Promise<User> {
		return await this.userModel.create(userParams);
	}

	async updateUserById(id: string, userParams: UserUpdateRequestDto): Promise<User> {
		try {
			const { username, password } = userParams;
			const user = await this.userModel.findById(id);

			if (!user) {
				throw new NotFoundException('User not found');
			}

			if (username) {
				user.username = username;
			}
			if (password) {
				const hashedPassword = await bcrypt.hash(password, 10); // Хешуємо новий пароль з силею хешування 10
				user.password = hashedPassword;
			}

			await user.save();
			return user;
		} catch (error) {
			console.error('Error updating user:', error);
			throw new NotFoundException('An error occurred while updating');
		}
	}

	async deleteUser(id: string): Promise<void> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const user: UserDocument | null = await this.userModel.findOne(query);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		await user.deleteOne();
	}
}

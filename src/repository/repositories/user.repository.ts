import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../modules/user/user.schema';
import { UserRequestDto } from 'src/common/dto/user/request/user-request.dto';
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

	async updateUser(id: string, data: Partial<User>) {
		return await this.userModel.findByIdAndUpdate({ _id: id }, data);
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

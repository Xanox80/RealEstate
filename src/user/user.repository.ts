import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRequestDto } from 'src/common/dto/user/request/user-request.dto';
import { UserUpdateRequestDto } from 'src/common/dto/user/request/user-update-request.dto';
const dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async registerUser(userParams: UserRequestDto): Promise<User> {
		try {
			const { username, password } = userParams;
			const hashedPassword = await bcrypt.hash(password, 10);
			return await this.userModel.create({ username, password: hashedPassword });
		} catch (error) {
			console.error('Error registering user:', error);
			throw new BadRequestException('Register failed');
		}
	}

	async registerOrLoginUser(
		userParams: UserRequestDto
	): Promise<[UserDocument, boolean]> {
		const existingUser = await this.userModel.findOne({
			username: userParams.username,
		});

		if (existingUser) {
			return [existingUser, false];
		}

		const newUser = new this.userModel({
			username: userParams.username,
			password: userParams.password,
		});
		await newUser.save();

		return [newUser, true];
	}

	async loginUser(userParams: UserRequestDto): Promise<User> {
		try {
			const { username, password } = userParams;
			const user = await this.userModel.findOne({
				username,
			});

			if (!user) {
				throw new NotFoundException('User not found');
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				throw new BadRequestException('Login or password wrong');
			}

			const access_token = jwt.sign(
				{ userId: user._id },
				process.env.TOKEN_SECRET || '',
				{
					expiresIn: '1h',
				}
			);

			return { ...user, access_token };
		} catch (error) {
			console.error('Error during login:', error);
			throw new BadRequestException('Login failed');
		}
	}

	async updateUser(userParams: UserUpdateRequestDto): Promise<User> {
		const { username, password } = userParams;
		const user: UserDocument | null = await this.userModel.findOne({
			username,
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (username) {
			user.username = username;
		}
		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			user.password = hashedPassword;
		}
		user.save();
		return user;
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

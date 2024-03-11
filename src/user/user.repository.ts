import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UserParamsDto } from './dto/user-params.dto';
import { AuthResultDto } from './dto/auth-result.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async registerUser(userParams: UserParamsDto): Promise<AuthResultDto> {
		try {
			const { username, password } = userParams;
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = new this.userModel({ username, hashedPassword });
			await newUser.save();

			return { success: true, message: 'User registered successfully!' };
		} catch (error) {
			console.error('Error registering user:', error);
			return { success: false, message: 'Register error' };
		}
	}
	async registerOrLoginUser(
		userParams: UserParamsDto
	): Promise<[UserDocument, boolean]> {
		// Check if the user already exists
		const existingUser = await this.userModel.findOne({
			username: userParams.username,
		});

		if (existingUser) {
			// User already exists, perform login logic
			// Return the user and a flag indicating login (not created)
			return [existingUser, false];
		}

		// User doesn't exist, perform registration logic
		const newUser = new this.userModel({
			username: userParams.username,
			password: userParams.password, // You should hash this password
		});

		await newUser.save();

		// Return the newly created user and a flag indicating registration (created)
		return [newUser, true];
	}
	async loginUser(userParams: UserParamsDto): Promise<AuthResultDto> {
		try {
			const { username, password } = userParams;
			const user: UserDocument | null = await this.userModel.findOne({
				username,
			});

			if (!user) {
				return { success: false, message: 'User not found' };
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return { success: false, message: 'Invalid password' };
			}

			const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET || '', {
				expiresIn: '1h',
			});

			return { success: true, token, message: 'Login success!' };
		} catch (error) {
			console.error('Error during login:', error);
			return { success: false, message: 'Error during login' };
		}
	}

	async updateUser(userParams: UserParamsDto): Promise<AuthResultDto> {
		const { username, password } = userParams;
		const user: UserDocument | null = await this.userModel.findOne({
			username,
		});

		if (!user) {
			return { success: false, message: 'User not found' };
		}

		if (username) {
			user.username = username;
		}
		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			user.password = hashedPassword;
		}
		user.save();
		return { success: true, message: 'Updated succesufully' };
	}

	async deleteUser(id: string): Promise<AuthResultDto> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const user: UserDocument | null = await this.userModel.findOne(query);
		if (!user) {
			return { success: false, message: 'User not found' };
		}

		await user.deleteOne();
		return { success: true, message: 'Deleted successufully' };
	}
}
// import bcrypt from 'bcrypt';
// import UserModel, { UserDocument } from '../../api/models/user.model';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// export interface AuthResult {
//   success: boolean;
//   message: string;
//   token?: string;
// }

// export class UserRepository {
//   constructor(private readonly userModel: typeof UserModel) {}
//   async registerUser(username: string, password: string): Promise<AuthResult> {
//     try {
//       const newUser = new this.userModel({ username, password });
//       await newUser.save();

//       return { success: true, message: 'User registered successfully!' };
//     } catch (error) {
//       console.error('Error registering user:', error);
//       return { success: false, message: 'Register error' };
//     }
//   }

//   async loginUser(username: string, password: string): Promise<AuthResult> {
//     try {
//       const user: UserDocument | null = await this.userModel.findOne({
//         username,
//       });

//       if (!user) {
//         return { success: false, message: 'User not found' };
//       }

//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (!passwordMatch) {
//         return { success: false, message: 'Invalid password' };
//       }

//       const token = jwt.sign(
//         { userId: user._id },
//         process.env.TOKEN_SECRET || '',
//         {
//           expiresIn: '1h',
//         },
//       );

//       return { success: true, token, message: 'Login success!' };
//     } catch (error) {
//       console.error('Error during login:', error);
//       return { success: false, message: 'Error during login' };
//     }
//   }
// }

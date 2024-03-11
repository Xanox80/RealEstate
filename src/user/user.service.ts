import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserParamsDto } from './dto/user-params.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
	userModel: any;
	constructor(private readonly userRepository: UserRepository) {}

	async loginUser(userParams: UserParamsDto) {
		return this.userRepository.loginUser(userParams);
	}
	async registerOrLoginUser(userParams: UserParamsDto): Promise<[User, boolean]> {
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

	async registerUser(userParams: UserParamsDto) {
		return this.userRepository.registerUser(userParams);
	}

	async updateUser(userParams: UserParamsDto) {
		return this.userRepository.updateUser(userParams);
	}

	async deleteUser(id: string) {
		return this.userRepository.deleteUser(id);
	}
}

// import { UserRepository, AuthResult } from '../user/user.repository';

// export default class UserService {
//   constructor(private readonly userRepository: UserRepository) {}
//   async registerUser(username: string, password: string): Promise<AuthResult> {
//     try {
//       return await this.userRepository.registerUser(username, password);
//     } catch (error) {
//       console.error('Error in UserService.registerUser:', error);
//       throw error; // rethrow the error to be caught by the calling function
//     }
//   }
//   async loginUser(username: string, password: string): Promise<AuthResult> {
//     try {
//       return await this.userRepository.loginUser(username, password);
//     } catch (error) {
//       console.error('Error in UserService.loginUser:', error);
//       throw error;
//     }
//   }
// }

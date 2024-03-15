import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import { UserRequestDto } from 'src/common/dto/user/request/user-request.dto';
import { UserUpdateRequestDto } from 'src/common/dto/user/request/user-update-request.dto';
import { UserResponseDto } from 'src/common/dto/user/response/user-response.dto';

@Injectable()
export class UserService {
	userModel: any;
	constructor(private readonly userRepository: UserRepository) {}

	async loginUser(userParams: UserRequestDto): Promise<UserResponseDto> {
		const log = await this.userRepository.loginUser(userParams);
		return UserResponseDto.mapFrom(log);
	}
	async registerOrLoginUser(userParams: UserRequestDto): Promise<[User, boolean]> {
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

	async registerUser(userParams: UserRequestDto) {
		return this.userRepository.registerUser(userParams);
	}

	async updateUser(userParams: UserUpdateRequestDto) {
		return this.userRepository.updateUser(userParams);
	}

	async deleteUser(id: string) {
		return this.userRepository.deleteUser(id);
	}
}

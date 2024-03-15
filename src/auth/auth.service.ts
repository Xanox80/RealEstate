import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { UserRequestDto } from 'src/common/dto/user/request/user-request.dto';
import { UserDto } from 'src/common/dto/user/user.dto';
import { UserResponseDto } from 'src/common/dto/user/response/user-response.dto';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
	constructor(private userRepository: UserRepository) {}

	async registerUser(userParams: UserDto): Promise<User> {
		return this.userRepository.registerUser(userParams);
	}

	async loginUser(userParams: UserDto): Promise<User> {
		return this.userRepository.loginUser(userParams);
	}

	async updateUser(userParams: UserDto): Promise<User> {
		return this.userRepository.updateUser(userParams);
	}

	async deleteUser(id: string): Promise<void> {
		return this.userRepository.deleteUser(id);
	}
}

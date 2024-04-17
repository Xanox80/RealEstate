import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/repositories/user.repository';
import { User } from './user.schema';
import { UserUpdateRequestDto } from 'src/common';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}
	async getUserById(id: string) {
		return this.userRepository.findById(id);
	}
	async upDateUser(id: string, userParams: UserUpdateRequestDto): Promise<User> {
		return this.userRepository.updateUserById(id, userParams);
	}

	async deleteUser(id: string) {
		return this.userRepository.deleteUser(id);
	}
}

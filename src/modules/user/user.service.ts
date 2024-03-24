import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/repositories/user.repository';

@Injectable()
export class UserService {
	userModel: any;
	constructor(private readonly userRepository: UserRepository) {}

	// async updateUser(userId: string, data: Partial<User>) { // TODO Rework from update to change password and username
	// 	return this.userRepository.updateUser(userId, data);
	// }

	async deleteUser(id: string) {
		return this.userRepository.deleteUser(id);
	}
}

import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/repository';
import { AuthRequestDto, AuthResponseDto } from 'src/common';
import { User } from 'src/modules/user/user.schema';
@Injectable()
export class AuthService {
	constructor(private authRepository: AuthRepository) {}

	async registerAuth(authParams: AuthRequestDto): Promise<AuthResponseDto> {
		return this.authRepository.register(authParams).then(AuthResponseDto.mapFrom);
	}

	async loginAuth(authParams: AuthRequestDto): Promise<AuthResponseDto> {
		return this.authRepository.login(authParams).then(AuthResponseDto.mapFrom);
	}
	async getUserById(id: string): Promise<User> {
		return this.authRepository.getUserById(id);
	}

	async googleLogin(req) {
		if (!req.user) {
			return 'Unathorized!';
		}
		return await this.authRepository.googleAuth(req.user);
	}
}

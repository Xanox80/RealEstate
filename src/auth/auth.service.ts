import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/repository';
import { AuthRequestDto, AuthResponseDto } from 'src/common';
@Injectable()
export class AuthService {
	constructor(private authRepository: AuthRepository) {}

	async registerAuth(authParams: AuthRequestDto): Promise<AuthResponseDto> {
		return this.authRepository.register(authParams).then(AuthResponseDto.mapFrom);
	}

	async loginAuth(authParams: AuthRequestDto): Promise<AuthResponseDto> {
		return this.authRepository.login(authParams).then(AuthResponseDto.mapFrom);
	}

	async googleLogin(req) {
		if (!req.user) {
			return 'Unathorized!';
		}
		return await this.authRepository.googleAuth(req.user);
	}
}

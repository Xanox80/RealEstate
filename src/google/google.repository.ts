import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GoogleRepository {
	constructor(
		private userRepository: UserRepository,
		private configService: ConfigService
	) {}

	async verifyUser(userinfo): Promise<any> {
		const username = userinfo.firstName + ' ' + userinfo.lastName;
		const password = '0';

		// Register user if not exists
		const registrationResult = await this.userRepository.registerUser({
			username,
			password,
		});

		if (!registrationResult) {
			return { success: false, message: 'Error during registration' };
		}

		// Find or create user using a hypothetical findOrCreate method
		const [user, created] = await this.userRepository.registerOrLoginUser({
			username,
			password,
		});

		const accessTokenSecret =
			this.configService.get<string>('ACCESS_TOKEN_SECRET') || 'default_secret';
		const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, {
			expiresIn: '1h',
		});
		const refreshTokenSecret =
			this.configService.get<string>('REFRESH_TOKEN_SECRET') || 'default_secret';
		const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
			expiresIn: '1h',
		});

		user.access_token = accessToken;
		user.refresh_token = refreshToken;

		if (created) {
			user.roleId = 1;
		}

		user.save();

		return {
			success: true,
			message: 'Verify success',
			access_token: accessToken,
			refresh_token: refreshToken,
		};
	}
}

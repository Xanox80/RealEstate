import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthRequestDto, UserResponseDto } from 'src/common';
import { User } from 'src/modules/user/user.schema';
import { getAuthSecret } from 'src/config';
import { UserRepository } from './user.repository';
import { ApiJwtPayload } from '../../common/interface';

const { atSecret, atSecretExpires, rtSecret, rtSecretExpires } = getAuthSecret();

@Injectable()
export class AuthRepository {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private userRepository: UserRepository
	) {}

	async register(authParams: AuthRequestDto): Promise<User> {
		const { username, password, number, role } = authParams;

		const check = await this.userModel.findOne({ username });

		if (check) {
			throw new BadRequestException('User already registered!');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await this.userModel.create({
			username,
			password: hashedPassword,
			number,
			role,
		});
		const tokenPair = await this.generateTokenPair({
			id: user.id,
			username: user.username,
			number: user.number,
			role: user.role,
		});

		return { ...user.toJSON(), ...tokenPair };
	}

	async getUserById(id: string): Promise<User> {
		return this.userModel.findById(id);
	}

	async login(userParams: AuthRequestDto): Promise<User> {
		const { username, password } = userParams;

		const user = await this.userModel
			.findOne({ username })
			.then(UserResponseDto.mapFrom);

		if (!user) {
			throw new NotFoundException('User not found!');
		}

		const match = await bcrypt.compare(password, user.password);

		if (match) {
			const tokenPair = await this.generateTokenPair({
				id: user.id,
				username: user.username,
				number: user.number,
				role: user.role,
			});
			await this.updateRtHash(user.id, tokenPair.refresh_token);

			return { ...user, ...tokenPair };
		} else {
			throw new UnauthorizedException('Email or password wrong!');
		}
	}

	async googleAuth(userinfo: any): Promise<User> {
		const username = userinfo.firstName + ' ' + userinfo.lastName;
		const password = '0';

		let foundedUser = await this.userRepository.findByParams({ username });

		// if (!foundedUser) {
		// 	const newUser = await this.register({ username, password });
		// 	foundedUser = newUser;
		// }

		// const tokenPair = await this.generateTokenPair({
		// 	id: foundedUser.id,
		// 	username: foundedUser.username,
		// 	number: foundedUser.number,
		// 	role: foundedUser.role,
		// });
		// return { ...foundedUser, ...tokenPair };
		return foundedUser;
	}

	async generateTokenPair(
		payload: ApiJwtPayload
	): Promise<{ access_token: string; refresh_token: string }> {
		const access_token = jwt.sign(payload, atSecret, {
			expiresIn: atSecretExpires,
		});
		const refresh_token = jwt.sign(payload, rtSecret, {
			expiresIn: rtSecretExpires,
		});

		return { access_token, refresh_token };
	}

	async updateRtHash(userId: string, refresh_token: string): Promise<void> {
		const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
		await this.userModel.findByIdAndUpdate(userId, {
			refresh_token: hashedRefreshToken,
		});
	}
}

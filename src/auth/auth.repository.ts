import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserParamsDto } from 'src/dtos/dto.auth';
import { NewAccessTokenResultDto } from 'src/dtos/dto.auth';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDto } from 'src/common/dto/user/user.dto';

@Injectable()
export class AuthRepository {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async registerUser(userParams: UserDto): Promise<any> {
		const { username, password } = userParams;

		const check = await this.userModel.findOne({ username });

		if (check) {
			return 'Username is taken!';
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new this.userModel({ username, password: hashedPassword });
		await newUser.save();

		const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';
		const accessToken = jwt.sign({ userId: newUser._id }, accessTokenSecret, {
			expiresIn: '1h',
		});

		const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'default_secret';
		const refreshToken = jwt.sign({ userId: newUser._id }, refreshTokenSecret, {
			expiresIn: '1h',
		});

		newUser.access_token = accessToken;
		newUser.refresh_token = refreshToken;
		newUser.roleId = 1;
		await newUser.save();

		return {
			success: true,
			message: 'Register Success!',
			accessToken,
			refreshToken,
		};
	}

	async loginUser(userParams: UserDto): Promise<any> {
		const { username, password } = userParams;

		const user: UserDocument | null = await this.userModel.findOne({ username });

		if (!user) {
			throw new BadRequestException('Wrong username!');
		}

		const match = await bcrypt.compare(password, user.password);

		if (match) {
			const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';
			const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, {
				expiresIn: '1h',
			});

			const refreshTokenSecret =
				process.env.REFRESH_TOKEN_SECRET || 'default_secret';
			const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
				expiresIn: '1h',
			});

			user.access_token = accessToken;
			user.refresh_token = refreshToken;
			await user.save();

			return {
				success: true,
				accessToken,
				refreshToken,
				userId: user._id,
			};
		}

		throw new BadRequestException('Wrong password!');
	}

	async generateNewAccessToken(refreshToken: string): Promise<NewAccessTokenResultDto> {
		try {
			const refreshTokenSecret =
				process.env.REFRESH_TOKEN_SECRET || 'default_secret';
			const payload = jwt.verify(refreshToken, refreshTokenSecret) as {
				userId: string;
			};
			const userId = payload.userId;

			const user: UserDocument | null = await this.userModel.findOne({
				_id: userId,
				refresh_token: refreshToken,
			});

			if (!user) {
				throw new UnauthorizedException('Unauthorized!');
			}

			const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';
			const accessToken = jwt.sign({ userId }, accessTokenSecret, {
				expiresIn: '60m',
			});

			return { success: true, accessToken };
		} catch (err) {
			throw new BadRequestException('Something went wrong', {
				cause: new Error(),
				description: err,
			});
		}
	}
}

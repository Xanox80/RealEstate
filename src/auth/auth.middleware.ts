import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
	ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { UserService } from 'src/user/user.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		readonly configService: ConfigService,
		readonly userService: UserService
	) {}

	use(req: Request, res: Response, next: NextFunction) {
		if (!req.headers.cookie) {
			throw new UnauthorizedException();
		}
		const cookies = req.headers.cookie.split('; ');
		const accessTokenCookie = cookies.find(cookie =>
			cookie.startsWith('accessToken=')
		);
		const accessToken = accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
		if (!accessToken) {
			throw new UnauthorizedException();
		}
		try {
			const payload = jwt.verify(
				accessToken,
				this.configService.get<string>('ACCESS_TOKEN_SECRET')
			);
			req.user = payload;
			next();
		} catch (err) {
			throw new ForbiddenException();
		}
	}
}

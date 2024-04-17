import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { getAuthSecret } from 'src/config';
import {
	BadRequestException,
	CanActivate,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { RolesEnum } from 'src/enum/roles.enum';

@Injectable()
export class UserRolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	public async canActivate(context: any): Promise<boolean> {
		const possibleUserRoles: RolesEnum[] = this.reflector.get<RolesEnum[]>(
			'possibleUserRoles',
			context.getHandler()
		);

		const request = context.switchToHttp().getRequest();
		const auth = request.headers.authorization;
		if (!auth) {
			throw new UnauthorizedException();
		}
		try {
			const decoded = jwtDecoded(auth);
			if (!possibleUserRoles.includes(decoded.role)) {
				throw new BadRequestException('Not enought rights');
			}
			request.user = decoded;
		} catch (error) {
			return false;
		}

		return true;
	}
}

export const jwtDecoded = (auth: string) => {
	const { atSecret } = getAuthSecret();
	const bearerToken = auth.split(' ')[1];
	return jwt.verify(bearerToken, atSecret) as any;
};

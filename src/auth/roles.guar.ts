import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());

		if (!roles) {
			// If there are no roles defined for the route, allow access
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = await this.userService.loginUser(request.user.userId);

		if (!user) {
			// If user not found, deny access
			return false;
		}
	}
}

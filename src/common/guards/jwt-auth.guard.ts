import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategyEnum } from 'src/enum/auth-strategy.enum';

@Injectable()
export class AtGuard extends AuthGuard(AuthStrategyEnum.JWT) {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride('isPublic', [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) {
			return true;
		}
		return super.canActivate(context);
	}
}

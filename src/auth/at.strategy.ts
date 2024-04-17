import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiJwtPayload } from 'src/common';
import { getAuthSecret } from 'src/config';
import { AuthStrategyEnum } from 'src/enum/auth-strategy.enum';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, AuthStrategyEnum.JWT) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: getAuthSecret().atSecret,
		});
	}

	async validate(payload: ApiJwtPayload) {
		return payload;
	}
}

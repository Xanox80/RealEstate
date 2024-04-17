import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RepositoryModule } from 'src/repository';
import { GoogleStrategy } from './google.strategy';

import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AtStrategy } from './at.strategy';

const providers = [AuthService, GoogleStrategy, AtStrategy, JwtService];

@Module({
	imports: [JwtModule.register({}), PassportModule, RepositoryModule],
	controllers: [AuthController],
	providers,
	exports: [...providers],
})
export class AuthModule {}

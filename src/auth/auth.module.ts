import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RepositoryModule } from 'src/repository';
import { GoogleStrategy } from './google.strategy';

const providers = [AuthService, GoogleStrategy];
const modules = [RepositoryModule];

@Module({
	imports: [...modules],
	controllers: [AuthController],
	providers,
	exports: [...providers],
})
export class AuthModule {}

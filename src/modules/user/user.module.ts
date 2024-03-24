import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RepositoryModule } from 'src/repository';

const providers = [UserService];
const modules = [RepositoryModule];

@Module({
	imports: [...modules],
	controllers: [UserController],
	providers,
	exports: [...providers],
})
export class UserModule {}

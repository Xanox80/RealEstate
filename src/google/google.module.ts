import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleController } from './google.controller';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from 'src/user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleRepository } from './google.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	controllers: [GoogleController],
	providers: [
		GoogleService,
		GoogleStrategy,
		ConfigService,
		GoogleRepository,
		UserRepository,
	],
})
export class GoogleModule {}

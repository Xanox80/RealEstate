import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/user/user.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	controllers: [AuthController],
	providers: [AuthService, UserRepository, AuthRepository, User, UserService],
})
export class AuthModule {}

import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Put,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { UserRequestDto } from 'src/common/dto/user/request/user-request.dto';
import { UserDto } from 'src/common/dto/user/user.dto';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guar';
import { UserResponseDto } from 'src/common/dto/user/response/user-response.dto';
import { User } from 'src/user/user.schema';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	async registerUser(@Body() userParams: UserDto): Promise<User> {
		return this.authService.registerUser(userParams);
	}

	@Post('login')
	async loginUser(@Body() userParams: UserDto): Promise<User> {
		return this.authService.loginUser(userParams);
	}

	@UseGuards(RolesGuard) // Use your RolesGuard here
	@Put('update')
	async updateUser(@Body() userParams: UserDto): Promise<User> {
		return this.authService.updateUser(userParams);
	}

	@UseGuards(RolesGuard) // Use your RolesGuard here
	@Delete('delete/:id')
	async deleteUser(@Param('id') id: string): Promise<void> {
		return this.authService.deleteUser(id);
	}
}

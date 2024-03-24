import {
	Controller,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	Get,
	Req,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthRequestDto, AuthResponseDto } from 'src/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	@ApiOperation({ description: 'login' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: AuthResponseDto })
	@Post('register')
	async registerAuth(@Body() authParams: AuthRequestDto): Promise<AuthResponseDto> {
		return this.authService.registerAuth(authParams);
	}

	@Post('login')
	@ApiOperation({ description: 'loginAuth' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: AuthResponseDto })
	async loginAuth(@Body() authParams: AuthRequestDto): Promise<AuthResponseDto> {
		return this.authService.loginAuth(authParams);
	}

	// Test throught Google, not throught swagger
	@Get('googleAuth')
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req) {
		req;
	}

	@Get('googleAuth/redirect')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req) {
		return this.authService.googleLogin(req);
	}
}

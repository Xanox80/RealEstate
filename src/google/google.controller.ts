import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
	constructor(private readonly googleService: GoogleService) {}

	@Get()
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req) {
		req;
	}

	@Get('redirect')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req) {
		return this.googleService.googleLogin(req);
	}
}

import { Injectable } from '@nestjs/common';
import { GoogleRepository } from './google.repository';

@Injectable()
export class GoogleService {
	constructor(private readonly repository: GoogleRepository) {}
	async googleLogin(req) {
		if (!req.user) {
			return 'Unathorized!';
		}
		return await this.repository.verifyUser(req.user);
	}
}

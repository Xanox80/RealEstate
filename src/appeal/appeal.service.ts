import { Injectable } from '@nestjs/common';
import { AppeealRepository } from './appeal.repository';
import { AppealParamsDto } from './dto/auth-result.dto';
import { AppealDocument } from './appeal.schema';

@Injectable()
export class AppealService {
	constructor(private readonly appealRepository: AppeealRepository) {}

	async createAppeal(appealParams: AppealParamsDto) {
		return this.appealRepository.createAppeal(appealParams);
	}

	async getAllAppeal(): Promise<AppealDocument[]> {
		return await this.appealRepository.getAllAppeal();
	}

	async deleteAppeal(id: string) {
		return await this.appealRepository.deleteAppeal(id);
	}
}

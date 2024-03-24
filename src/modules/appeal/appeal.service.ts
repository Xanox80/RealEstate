import { Injectable } from '@nestjs/common';
import { AppeealRepository } from '../../repository/repositories/appeal.repository';
import { AppealDocument } from './appeal.schema';
import { AppealDto } from 'src/common/dto/appeal';

@Injectable()
export class AppealService {
	constructor(private readonly appealRepository: AppeealRepository) {}

	async createAppeal(appealParams: AppealDto) {
		return this.appealRepository.createAppeal(appealParams);
	}

	async getAllAppeal(): Promise<AppealDocument[]> {
		return await this.appealRepository.getAllAppeal();
	}

	async deleteAppeal(id: string) {
		return await this.appealRepository.deleteAppeal(id);
	}
}

import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { AppealDocument } from './appeal.schema';
import { AppealParamsDto } from './dto/auth-result.dto';
import { AppealService } from './appeal.service';

@Controller('appeal')
export class AppealController {
	constructor(private readonly appealService: AppealService) {}

	@Post('/api/createAppeal')
	async createAppeal(@Body() appealParams: AppealParamsDto) {
		return this.appealService.createAppeal(appealParams);
	}
	@Get('/api/getAllAppeal')
	async getAllAppeal(): Promise<AppealDocument[]> {
		return this.appealService.getAllAppeal();
	}
	@Delete('/api/deleteAppeal/:id')
	deleteAppeal(@Param() id: string) {
		this.appealService.deleteAppeal(id);
	}
}

import {
	Controller,
	Post,
	Delete,
	Param,
	Body,
	Get,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { AppealDocument } from './appeal.schema';
import { AppealService } from './appeal.service';
import { AppealDto } from 'src/common/dto/appeal';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('appeal')
@ApiTags('Appeal')
@ApiBearerAuth()
@Controller('appeal')
export class AppealController {
	constructor(private readonly appealService: AppealService) {}

	@ApiOperation({ description: 'CreateAppeal' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	@Post('/createAppeal')
	async createAppeal(@Body() appealParams: AppealDto) {
		return this.appealService.createAppeal(appealParams);
	}
	@Get('/getAllAppeal')
	@ApiOperation({ description: 'Get all Appeal' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	async getAllAppeal(): Promise<AppealDocument[]> {
		return this.appealService.getAllAppeal();
	}
	@Delete('/deleteAppeal/:id')
	@ApiOperation({ description: 'DeleteAppeal' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	deleteAppeal(@Param('id') id: string) {
		this.appealService.deleteAppeal(id);
	}
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/main') // Сюда сунеш усі статичні вкладки HTML, цей контролер тупо ними відповідати повинен
	getHello(): string {
		return this.appService.getHello();
	}
}

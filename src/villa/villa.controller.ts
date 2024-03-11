import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { VillaService } from './villa.service';
import { VillaParamsDto } from './dto/viila-paramss.dto';
import { VillaDocument } from './villa.schema';

@Controller('villa')
export class VillaController {
	constructor(private readonly villaService: VillaService) {}

	@Post('/api/createVilla')
	async createVilla(@Body() villaParams: VillaParamsDto) {
		return this.villaService.createVilla(villaParams);
	}
	@Post('/api/updateVilla')
	updateVilla(@Body() villaParams: VillaParamsDto) {
		return this.villaService.updateVilla(villaParams);
	}
	@Get('/api/getAllVilla')
	async getAllVilla(): Promise<VillaDocument[]> {
		return this.villaService.getAllVilla();
	}
	@Delete('/api/deleteVilla/:id')
	deleteVilla(@Param() id: string) {
		this.villaService.deleteVilla(id);
	}
}

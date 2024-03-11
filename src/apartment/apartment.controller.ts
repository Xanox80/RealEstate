import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { ApartmentService } from './apartment.serivce';
import { ApartmentParamsDto } from './dto/apartment-params.dto';
import { ApartmentDocument } from './apartment.schema';
@Controller('apartment')
export class ApartmentController {
	constructor(private readonly apartmentService: ApartmentService) {}

	@Post('/api/createApartment')
	async createApartment(@Body() apartmentParams: ApartmentParamsDto) {
		return this.apartmentService.createApartment(apartmentParams);
	}
	@Post('/api/updateApartment')
	updateApartment(@Body() apartmentParams: ApartmentParamsDto) {
		return this.apartmentService.updateApartment(apartmentParams);
	}
	@Get('/api/getAllApartment')
	async getAllApartment(): Promise<ApartmentDocument[]> {
		return this.apartmentService.getAllApartment();
	}
	@Delete('/api/deleteApartment/:id')
	deleteApartment(@Param() id: string) {
		this.apartmentService.deleteApartment(id);
	}
}

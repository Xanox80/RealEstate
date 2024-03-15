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
import { ApartmentService } from './apartment.serivce';
import { ApartmentParamsDto } from './dto/apartment-params.dto';
import { ApartmentDocument } from './apartment.schema';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApartmentResponsDto } from 'src/common/dto/apartment/response/apartment-response.dto';
import { ApartmentDto } from 'src/common/dto/apartment/apartment.dto';

@Controller('apartment')
@ApiTags('Apartment')
@ApiBearerAuth()
@Controller('apartment')
export class ApartmentController {
	constructor(private readonly apartmentService: ApartmentService) {}

	@Post('/api/createApartment')
	@ApiOperation({ description: 'CreateApartment' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	async createApartment(@Body() apartmentParams: ApartmentDto) {
		return this.apartmentService.createApartment(apartmentParams);
	}
	@Post('/api/updateApartment/:id')
	@ApiOperation({ description: 'UpdateApartment' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: ApartmentResponsDto })
	updateApartment(
		@Param('id') id: string,
		@Body() apartmentParams: ApartmentParamsDto
	) {
		apartmentParams.id = id;
		return this.apartmentService.updateApartment(apartmentParams);
	}
	@Get('/api/getAllApartment')
	@ApiOperation({ description: 'Get all Apartment' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	async getAllApartment(): Promise<ApartmentDocument[]> {
		return this.apartmentService.getAllApartment();
	}
	@Delete('/api/deleteApartment/:id')
	@ApiOperation({ description: 'DeleteApartment' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	deleteApartment(@Param('id') id: string) {
		this.apartmentService.deleteApartment(id);
	}
}

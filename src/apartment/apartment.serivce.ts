import { Injectable } from '@nestjs/common';
import { ApartmentRepository } from './apartment.repository';
import { ApartmentParamsDto } from './dto/apartment-params.dto';
import { ApartmentDocument } from './apartment.schema';
import { ApartmentUpdateRequest } from 'src/common/dto/apartment/request/apartment-update-request.dto';

@Injectable()
export class ApartmentService {
	constructor(private readonly apartmentRepository: ApartmentRepository) {}

	async createApartment(apartmentParams: ApartmentParamsDto) {
		return this.apartmentRepository.createApartment(apartmentParams);
	}

	async getAllApartment(): Promise<ApartmentDocument[]> {
		return await this.apartmentRepository.getAllApartment();
	}
	async deleteApartment(id: string) {
		return await this.apartmentRepository.deleteApartment(id);
	}

	async updateApartment(noteParams: ApartmentUpdateRequest) {
		return await this.apartmentRepository.updateApartment(noteParams);
	}
}

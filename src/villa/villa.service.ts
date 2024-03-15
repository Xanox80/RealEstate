import { Injectable } from '@nestjs/common';
import { VillaRepository } from './villa.repository';
import { VillaParamsDto } from './dto/viila-paramss.dto';
import { VillaDocument } from './villa.schema';
import { VillaDto } from 'src/common/dto/villa/villa.dto';
import { VillaUpdateRequestDto } from 'src/common/dto/villa/request/villa-update.dto';

@Injectable()
export class VillaService {
	constructor(private readonly villaRepository: VillaRepository) {}

	async createVilla(villaParams: VillaParamsDto) {
		return this.villaRepository.createVilla(villaParams);
	}

	async getAllVilla(): Promise<VillaDocument[]> {
		return await this.villaRepository.getAllVilla();
	}
	async deleteVilla(id: string) {
		return await this.villaRepository.deleteVilla(id);
	}

	async updateVilla(noteParams: VillaUpdateRequestDto) {
		return await this.villaRepository.updateVilla(noteParams);
	}
}

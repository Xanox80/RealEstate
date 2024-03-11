import { Injectable } from '@nestjs/common';
import { VillaRepository } from './villa.repository';
import { VillaParamsDto } from './dto/viila-paramss.dto';
import { VillaDocument } from './villa.schema';

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

	async updateVilla(villaParams: VillaParamsDto) {
		return await this.villaRepository.updateNote(villaParams);
	}
}

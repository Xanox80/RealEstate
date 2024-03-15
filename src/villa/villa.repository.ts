import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { VillaModel, VillaDocument } from './villa.schema';
import { VillaParamsDto } from './dto/viila-paramss.dto';
import { AuthResultDto } from './dto/auth-result.dto';
import { VillaDto } from 'src/common/dto/villa/villa.dto';
import { VillaResponseDto } from 'src/common/dto/villa/response/villa-response.dto';
import { VillaUpdateRequestDto } from 'src/common/dto/villa/request/villa-update.dto';

@Injectable()
export class VillaRepository {
	constructor(
		@InjectModel(VillaModel.name)
		private readonly villaModel: Model<VillaDocument>
	) {}

	async createVilla(updatedData: VillaDto): Promise<any> {
		return await this.villaModel.create(updatedData);
	}
	async getAllVilla(): Promise<VillaDocument[]> {
		try {
			const result = await this.villaModel.find().exec();

			return result || [];
		} catch (error) {
			console.log('Error when getting notes from repository:', error);
			throw error;
		}
	}

	async deleteVilla(id: string): Promise<VillaResponseDto> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const note: VillaDocument | null = await this.villaModel.findOne(query);
		if (!note) {
			throw new NotFoundException('Note not found');
		}
		await note.deleteOne();
		throw new NotFoundException('successufully delete');
	}

	async updateVilla(villaParams: VillaUpdateRequestDto): Promise<VillaModel> {
		try {
			const { id, Name, Surname, price, residence } = villaParams;
			const villa = await this.villaModel.findById(id);

			if (!villa) {
				throw new NotFoundException('Note not found');
			}

			if (Name !== undefined) {
				villa.Name = Name;
			}
			if (Surname !== undefined) {
				villa.Surname = Surname;
			}
			if (price !== undefined) {
				villa.price = price;
			}
			if (residence !== undefined) {
				villa.residence = residence;
			}

			await villa.save();

			return villa;
		} catch (error) {
			throw new NotFoundException('An error occurred while updating');
		}
	}
}

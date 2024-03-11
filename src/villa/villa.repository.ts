import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { VillaModel, VillaDocument } from './villa.schema';
import { VillaParamsDto } from './dto/viila-paramss.dto';
import { AuthResultDto } from './dto/auth-result.dto';

@Injectable()
export class VillaRepository {
	constructor(
		@InjectModel(VillaModel.name)
		private readonly villaModel: Model<VillaDocument>
	) {}

	async createVilla(updatedData: VillaParamsDto): Promise<any> {
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

	async deleteVilla(id: string): Promise<AuthResultDto> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const note: VillaDocument | null = await this.villaModel.findOne(query);
		if (!note) {
			return { success: false, message: 'Note not found' };
		}
		await note.deleteOne();
		return { success: true, message: 'Deleted successufully' };
	}

	async updateNote(villaParams: VillaParamsDto): Promise<AuthResultDto> {
		try {
			const { id, Name, Surname, price, residence } = villaParams;
			const query = { _id: new mongoose.Types.ObjectId(id) };
			const note: VillaDocument | null = await this.villaModel.findOne(query);

			if (!note) {
				return { success: false, message: 'Note not found' };
			}

			if (Name) {
				note.Name = Name;
			}
			if (Surname) {
				note.Surname = Surname;
			}
			if (price) {
				note.price = price;
			}
			if (residence) {
				note.residence = residence;
			}

			await note.save();

			return { success: true, message: 'Updated successfully' };
		} catch (error) {
			console.error('Error updating note:', error);
			return { success: false, message: 'An error occurred while updating' };
		}
	}
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ApartmentModel, ApartmentDocument } from './apartment.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ApartmentParamsDto } from './dto/apartment-params.dto';
import { AuthResultDto } from './dto/auth-result.dto';

@Injectable()
export class ApartmentRepository {
	constructor(
		@InjectModel(ApartmentModel.name)
		private readonly apartmentModel: Model<ApartmentDocument>
	) {}

	async createApartment(updatedData: ApartmentParamsDto): Promise<any> {
		return await this.apartmentModel.create(updatedData);
	}

	async getAllApartment(): Promise<ApartmentDocument[]> {
		try {
			const result = await this.apartmentModel.find().exec();
			return result || [];
		} catch (error) {
			console.log('Error when getting notes from repository:', error);
			throw error;
		}
	}

	async deleteApartment(id: string): Promise<AuthResultDto> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const note: ApartmentDocument | null = await this.apartmentModel.findOne(query);
		if (!note) {
			return { success: false, message: 'Note not found' };
		}
		await note.deleteOne();
		return { success: true, message: 'Deleted successufully' };
	}

	async updateApartment(apartmentParams: ApartmentParamsDto): Promise<AuthResultDto> {
		try {
			const { id, Name, Surname, price, residence } = apartmentParams;
			const query = { _id: new mongoose.Types.ObjectId(id) };
			const note: ApartmentDocument | null =
				await this.apartmentModel.findOne(query);

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

			await note.save(); // Добавлено ожидание сохранения

			return { success: true, message: 'Updated successfully' };
		} catch (error) {
			// Обработка ошибок, если необходимо
			console.error('Error updating note:', error);
			return { success: false, message: 'An error occurred while updating' };
		}
	}
}

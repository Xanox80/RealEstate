import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Apartmen, ApartmentDocument } from '../../modules/apartment/apartment.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ApartmentDto, ApartmentResponsDto } from 'src/common';

@Injectable()
export class ApartmentRepository {
	constructor(
		@InjectModel(Apartmen.name)
		private readonly apartmentModel: Model<ApartmentDocument>
	) {}

	async createApartment(updatedData: ApartmentDto): Promise<any> {
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

	async deleteApartment(id: string): Promise<ApartmentResponsDto> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const note: ApartmentDocument | null = await this.apartmentModel.findOne(query);
		if (!note) {
			throw new NotFoundException('Note not found');
		}
		await note.deleteOne();
		throw new NotFoundException('successufully delete');
	}

	async updateApartment(apartmentParams: ApartmentDto): Promise<Apartmen> {
		try {
			const { id, Name, Surname, price, residence } = apartmentParams;
			const apartment = await this.apartmentModel.findById(id);

			if (!apartment) {
				throw new NotFoundException('Note not found');
			}

			if (Name) {
				apartment.Name = Name;
			}
			if (Surname) {
				apartment.Surname = Surname;
			}
			if (price) {
				apartment.price = price;
			}
			if (residence) {
				apartment.residence = residence;
			}

			await apartment.save();
			return apartment;
		} catch (error) {
			console.error('Error updating note:', error);
			throw new NotFoundException('An error occurred while updating');
		}
	}
}

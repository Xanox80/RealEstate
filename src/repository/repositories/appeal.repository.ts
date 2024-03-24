import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AppealDocument, Appeal } from '../../modules/appeal/appeal.schema';
import { AppealDto, AppealResponsDto } from 'src/common/dto/appeal';

@Injectable()
export class AppeealRepository {
	constructor(
		@InjectModel(Appeal.name)
		private readonly appealModel: Model<AppealDocument>
	) {}

	async createAppeal(updatedData: AppealDto): Promise<any> {
		return await this.appealModel.create(updatedData);
	}

	async getAllAppeal(): Promise<AppealDocument[]> {
		try {
			const result = await this.appealModel.find().exec();
			return result || [];
		} catch (error) {
			console.log('Error when getting notes from repository:', error);
			throw error;
		}
	}

	async deleteAppeal(id: string): Promise<AppealResponsDto> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const appeal: AppealDocument | null = await this.appealModel.findOne(query);
		if (!appeal) {
			throw new NotFoundException('Note not found');
		}
		await appeal.deleteOne();
		throw new NotFoundException('successufully delete');
	}
}

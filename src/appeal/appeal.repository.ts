import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AppealDocument, AppealModel } from './appeal.schema';
import { AppealParamsDto } from './dto/auth-result.dto';
import { AuthResultDto } from './dto/appeal-params.dto';

@Injectable()
export class AppeealRepository {
	constructor(
		@InjectModel(AppealModel.name)
		private readonly appealModel: Model<AppealDocument>
	) {}

	async createAppeal(updatedData: AppealParamsDto): Promise<any> {
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

	async deleteAppeal(id: string): Promise<AuthResultDto> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const appeal: AppealDocument | null = await this.appealModel.findOne(query);
		if (!appeal) {
			return { success: false, message: 'Appeal not found' };
		}
		await appeal.deleteOne();
		return { success: true, message: 'Deleted successufully' };
	}
}

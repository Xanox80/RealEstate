import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from 'src/modules/rating/rating.shema';

@Injectable()
export class RatingRepository {
	constructor(
		@InjectModel(Rating.name) private readonly ratingModel: Model<RatingDocument>
	) {}
	async getQueryCount(objectId) {
		try {
			const obj = await this.ratingModel.findById(objectId);
			if (obj) {
				return obj.rating;
			} else {
				return 0;
			}
		} catch (error) {
			console.error('Помилка при отриманні лічильника запитів:', error);
			return 0;
		}
	}
	async addRating(objectId: string, rating: number): Promise<void> {
		try {
			let ratingEntry = await this.ratingModel.findOne({ objectId });

			if (!ratingEntry) {
				ratingEntry = new this.ratingModel({ objectId, rating, count: 1 });
			} else {
				const currentCount = await this.getQueryCount(objectId);
				const newCount = currentCount + 1;
				const currentTotalRating = ratingEntry.rating * ratingEntry.count;
				const newTotalRating = currentTotalRating + rating;
				const newAverageRating = newTotalRating / newCount;

				ratingEntry.rating = newAverageRating;
				ratingEntry.count = newCount;
			}

			await ratingEntry.save();
		} catch (error) {
			console.error('Помилка при додаванні рейтингу:', error);
		}
	}

	async getAverageRating(objectId: string): Promise<number> {
		const ratingEntry = await this.ratingModel.findOne({ objectId });

		if (!ratingEntry) {
			return 0;
		}

		return ratingEntry.rating;
	}
}

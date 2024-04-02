import { Injectable } from '@nestjs/common';
import { RatingRepository } from 'src/repository/repositories/rating.repository';

@Injectable()
export class RatingService {
	constructor(private readonly ratingRepository: RatingRepository) {}

	async rateObject(objectId: string, rating: number): Promise<void> {
		await this.ratingRepository.addRating(objectId, rating);
	}

	async getObjectRating(objectId: string): Promise<number> {
		return await this.ratingRepository.getAverageRating(objectId);
	}
}

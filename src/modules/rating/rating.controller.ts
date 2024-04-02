import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingRequestDto, RatingResponseDto } from 'src/common';

@Controller('ratings')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@Post(':objectId')
	async rateObject(
		@Param('objectId') objectId: string,
		@Body() dto: RatingRequestDto
	): Promise<void> {
		await this.ratingService.rateObject(objectId, dto.rating);
	}

	@Get(':objectId')
	async getObjectRating(
		@Param('objectId') objectId: string
	): Promise<RatingResponseDto> {
		const averageRating = await this.ratingService.getObjectRating(objectId);
		return { averageRating };
	}
}

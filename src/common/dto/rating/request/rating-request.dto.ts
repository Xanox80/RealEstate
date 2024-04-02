import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ratingDto } from '../rating.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RatingRequestDto extends ratingDto {
	@ApiProperty()
	@Expose()
	rating: number;
}

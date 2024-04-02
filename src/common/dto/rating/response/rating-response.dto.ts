import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RatingResponseDto {
	@ApiProperty()
	@Expose()
	averageRating: number;
}

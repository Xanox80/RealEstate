import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RatingResponseDto {
	@ApiProperty()
	@Expose()
	averageRating: number;
}

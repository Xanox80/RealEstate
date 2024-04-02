import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ratingDto {
	@ApiProperty({ example: '5' })
	@IsNumber()
	@IsNotEmpty()
	@Expose()
	rating: number;

	@ApiProperty({ example: '223sefsefsee534' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	id: string;
}

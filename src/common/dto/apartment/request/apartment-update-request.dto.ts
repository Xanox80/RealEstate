import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class ApartmentUpdateRequest {
	@ApiProperty({ example: 'Bogdan' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	Name: string;

	@ApiProperty({ example: 'Serventnik' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	Surname: string;

	@ApiProperty({ example: +3809234234 })
	@IsString()
	@IsNotEmpty()
	@Expose()
	price: number;

	@ApiProperty({ example: 'Description of the building' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	residence: string;

	@ApiPropertyOptional()
	@IsString()
	@IsNotEmpty()
	@Expose()
	id: string;
}

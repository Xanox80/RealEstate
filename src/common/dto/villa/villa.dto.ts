import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { VillaModel } from 'src/villa/villa.schema';

export class VillaDto extends VillaModel {
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

	@IsString()
	@IsNotEmpty()
	@Expose()
	id: string;
}

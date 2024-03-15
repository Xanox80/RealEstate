import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApartmentDto } from '../apartment.dto';

export class ApartmentResponsDto extends ApartmentDto {
	@ApiProperty()
	@Expose()
	id: string;

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

	success: boolean;
	message: string;
}

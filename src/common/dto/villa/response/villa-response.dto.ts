import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { VillaDto } from '../villa.dto';

export class VillaResponseDto extends VillaDto {
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

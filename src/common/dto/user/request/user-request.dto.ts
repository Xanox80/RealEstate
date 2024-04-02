import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserRequestDto {
	@ApiProperty({ example: 'Bogdan' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	username: string;

	@ApiProperty({ example: '11111111' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	password: string;

	@ApiProperty({ example: '+98457384' })
	@IsNumber()
	@IsNotEmpty()
	@Expose()
	number: number;
}

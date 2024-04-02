import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class AuthRequestDto {
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

	@ApiPropertyOptional({ example: '034985734' })
	@IsNumber()
	@IsNotEmpty()
	@Expose()
	number?: number;
}

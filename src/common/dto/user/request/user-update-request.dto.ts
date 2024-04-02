import { Optional } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UserUpdateRequestDto {
	@IsString()
	@Expose()
	@Optional()
	id?: string;

	@ApiPropertyOptional({ example: 'Bogdan' })
	@IsString()
	@Expose()
	@Optional()
	username?: string;

	@ApiPropertyOptional({ example: '11111111' })
	@IsString()
	@Optional()
	@Expose()
	password?: string;

	@ApiPropertyOptional({ example: '+98457384' })
	@IsNumber()
	@Expose()
	number: number;
}

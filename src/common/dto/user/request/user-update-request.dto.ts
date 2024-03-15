import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserUpdateRequestDto {
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
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RolesEnum } from '../../../enum/roles.enum';

export class UserDto {
	@ApiProperty({ example: 'Bogdan' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	username: string;

	@ApiProperty({ example: '02394234233242' })
	@IsNotEmpty()
	@Expose()
	@IsNumber()
	number: number;

	@ApiProperty({ example: '11111111' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	password: string;

	@ApiProperty()
	@Expose()
	access_token: string;

	@ApiProperty()
	@Expose()
	refresh_token: string;

	@ApiPropertyOptional()
	@Expose()
	g_id?: string;

	@ApiProperty()
	@Expose()
	role: RolesEnum;
}

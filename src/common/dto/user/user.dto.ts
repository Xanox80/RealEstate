import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.schema';

export class UserDto extends User {
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
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { UserDto } from '../user.dto';
import { User } from 'src/user/user.schema';

export class UserResponseDto extends UserDto {
	@ApiProperty()
	@Expose()
	id: string;

	@ApiPropertyOptional()
	@Expose()
	access_token?: string;

	@ApiPropertyOptional()
	@Expose()
	g_id?: string;

	public static mapFrom(data: User): UserResponseDto {
		return plainToClass(UserResponseDto, data, { excludeExtraneousValues: true });
	}

	public static mapFromMulti<P>(data: User[]): UserResponseDto[] {
		return data.map(UserResponseDto.mapFrom);
	}
}

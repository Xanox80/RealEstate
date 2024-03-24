import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { UserDto } from '../user.dto';
import { User } from 'src/modules/user/user.schema';

export class UserResponseDto extends UserDto {
	@ApiProperty()
	@Expose()
	id: string;

	public static mapFrom(data: User): UserResponseDto {
		return plainToClass(UserResponseDto, data, { excludeExtraneousValues: true });
	}

	public static mapFromMulti(data: User[]): UserResponseDto[] {
		return data.map(UserResponseDto.mapFrom);
	}
}

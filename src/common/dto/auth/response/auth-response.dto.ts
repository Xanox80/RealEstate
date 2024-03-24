import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { AuthDto } from '../auth.dto';
import { User } from 'src/modules/user/user.schema';

export class AuthResponseDto extends AuthDto {
	@ApiProperty()
	@Expose()
	id: string;

	public static mapFrom(data: User): AuthResponseDto {
		return plainToClass(AuthResponseDto, data, { excludeExtraneousValues: true });
	}

	public static mapFromMulti(data: User[]): AuthResponseDto[] {
		return data.map(AuthResponseDto.mapFrom);
	}
}

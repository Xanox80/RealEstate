import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PhotoResponseDto {
	@ApiProperty()
	@Expose()
	photoBase64: string;
}

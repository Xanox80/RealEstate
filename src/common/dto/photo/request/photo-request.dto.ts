import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { photoDto } from '../photo.dto';

export class PhotoRequestDto extends photoDto {
	@ApiProperty()
	@Expose()
	photoBase64: string;
}

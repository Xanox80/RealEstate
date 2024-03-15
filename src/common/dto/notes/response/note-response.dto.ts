import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { NoteDto } from '../note.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class NoteResponseDto extends NoteDto {
	@ApiProperty()
	@Expose()
	id: string;

	@ApiProperty({ example: 'Bogdan' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	Name: string;

	@ApiProperty({ example: 'Serventnik' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	Surname: string;

	success: boolean;
	message: string;
}

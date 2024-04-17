import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { Note } from 'src/modules/notes/note.schema';

export class NoteResponseDto {
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

	public static mapFrom(data: Note): NoteResponseDto {
		return plainToClass(NoteResponseDto, data, { excludeExtraneousValues: true });
	}

	public static mapFromMulti(data: Note[]): NoteResponseDto[] {
		return data.map(NoteResponseDto.mapFrom);
	}
}

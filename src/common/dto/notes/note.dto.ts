import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { NoteModel } from 'src/notes/note.schema';

export class NoteDto extends NoteModel {
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

	@ApiProperty({ example: +3809234234 })
	@IsString()
	@IsNotEmpty()
	@Expose()
	price: number;

	@ApiProperty({ example: 'Description of the building' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	residence: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	id: string;
}

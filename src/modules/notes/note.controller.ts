import {
	Controller,
	Post,
	Delete,
	Param,
	Body,
	Get,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { NotesService } from './note.service';
import { NoteDto } from 'src/common/dto/notes/note.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoteResponseDto } from 'src/common';

@Controller('notes')
@ApiTags('Note')
@ApiBearerAuth()
@Controller('notes')
export class NoteController {
	constructor(private readonly noteService: NotesService) {}

	@Post('/createNote')
	@ApiOperation({ description: 'CreateNote' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: NoteResponseDto })
	async createNote(@Body() noteParams: NoteDto) {
		return this.noteService.createNote(noteParams);
	}
	@Post('/update/:id')
	@ApiOperation({ description: 'UpdateNote' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	async updateNote(@Param('id') id: string, @Body() noteParams: NoteDto) {
		// Combine id with noteParams
		noteParams.id = id;
		return this.noteService.updateNote(noteParams);
	}

	@Get('/getAllNotes')
	@ApiOperation({ description: 'Get all Apartment' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	async getAllNotes(): Promise<NoteResponseDto[]> {
		return this.noteService.getAllNote();
	}
	@Delete('/deleteNote/:id')
	@ApiOperation({ description: 'DeleteNote' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	deleteNote(@Param('id') id: string) {
		this.noteService.deleteNote(id);
	}
}

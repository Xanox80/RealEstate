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

import { NoteDocument } from './note.schema';
import { NoteDto } from 'src/common/dto/notes/note.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/common/dto/user/response/user-response.dto';
import { NoteResponseDto } from 'src/common/dto/notes/response/note-response.dto';

@Controller('notes')
@ApiTags('Note')
@ApiBearerAuth()
@Controller('notes')
export class NoteController {
	constructor(private readonly noteService: NotesService) {}

	@Post('/api/createNote')
	@ApiOperation({ description: 'CreateNote' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: NoteResponseDto })
	async createNote(@Body() noteParams: NoteDto) {
		return this.noteService.createNote(noteParams);
	}
	@Post('/api/update/:id')
	@ApiOperation({ description: 'UpdateNote' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	async updateNote(@Param('id') id: string, @Body() noteParams: NoteDto) {
		// Combine id with noteParams
		noteParams.id = id;
		return this.noteService.updateNote(noteParams);
	}

	@Get('/api/getAllNotes')
	@ApiOperation({ description: 'Get all Apartment' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	async getAllNotes(): Promise<NoteDocument[]> {
		return this.noteService.getAllNote();
	}
	@Delete('/api/deleteNote/:id')
	@ApiOperation({ description: 'DeleteNote' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	deleteNote(@Param('id') id: string) {
		this.noteService.deleteNote(id);
	}
}

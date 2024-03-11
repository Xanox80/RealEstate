import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { NotesService } from './note.service';
import { NoteParamsDto } from './dto/note-params.dto';
import { NoteDocument } from './note.schema';

@Controller('notes')
export class NoteController {
	constructor(private readonly noteService: NotesService) {}

	@Post('/api/createNote')
	async createNote(@Body() noteParams: NoteParamsDto) {
		return this.noteService.createNote(noteParams);
	}
	@Post('/api/update')
	updateNote(@Body() noteParams: NoteParamsDto) {
		return this.noteService.updateNote(noteParams);
	}
	@Get('/api/getAllNotes')
	async getAllNotes(): Promise<NoteDocument[]> {
		return this.noteService.getAllNote();
	}
	@Delete('/api/deleteNote/:id')
	deleteNote(@Param() id: string) {
		this.noteService.deleteNote(id);
	}
}

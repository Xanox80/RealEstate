import { Injectable } from '@nestjs/common';
import { NotesRepository } from './notes.reporsitory';
import { NoteParamsDto } from './dto/note-params.dto';
import { NoteDocument } from './note.schema';

@Injectable()
export class NotesService {
	constructor(private readonly notesRepository: NotesRepository) {}

	async createNote(noteParams: NoteParamsDto) {
		return this.notesRepository.createNote(noteParams);
	}

	async getAllNote(): Promise<NoteDocument[]> {
		return await this.notesRepository.getAllNote();
	}
	async deleteNote(id: string) {
		return await this.notesRepository.deleteNotes(id);
	}

	async updateNote(noteParams: NoteParamsDto) {
		return await this.notesRepository.updateNote(noteParams);
	}
}

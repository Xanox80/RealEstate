import { Injectable } from '@nestjs/common';
import { NotesRepository } from './notes.reporsitory';
import { NoteParamsDto } from './dto/note-params.dto';
import { NoteDocument } from './note.schema';
import { Noterequest } from 'src/common/dto/notes/request/note-request.dto';
import { NoteUpdaterequestDto } from 'src/common/dto/notes/request/note-update.dto';

@Injectable()
export class NotesService {
	constructor(private readonly notesRepository: NotesRepository) {}

	async createNote(noteParams: Noterequest) {
		return this.notesRepository.createNote(noteParams);
	}

	async getAllNote(): Promise<NoteDocument[]> {
		return await this.notesRepository.getAllNote();
	}
	async deleteNote(id: string) {
		return await this.notesRepository.deleteNotes(id);
	}

	async updateNote(noteParams: NoteUpdaterequestDto) {
		return await this.notesRepository.updateNote(noteParams);
	}
}

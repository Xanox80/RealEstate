import { Injectable } from '@nestjs/common';
import { NotesRepository } from '../../repository/repositories/notes.reporsitory';
import { Noterequest } from 'src/common/dto/notes/request/note-request.dto';
import { NoteUpdaterequestDto } from 'src/common/dto/notes/request/note-update.dto';
import { NoteResponseDto } from 'src/common';

@Injectable()
export class NotesService {
	constructor(private readonly notesRepository: NotesRepository) {}

	async createNote(noteParams: Noterequest) {
		return this.notesRepository.createNote(noteParams);
	}

	async getAllNote(): Promise<NoteResponseDto[]> {
		return await this.notesRepository.getAllNote().then(NoteResponseDto.mapFromMulti);
	}
	async deleteNote(id: string) {
		return await this.notesRepository.deleteNotes(id);
	}

	async updateNote(noteParams: NoteUpdaterequestDto) {
		return await this.notesRepository.updateNote(noteParams);
	}
}

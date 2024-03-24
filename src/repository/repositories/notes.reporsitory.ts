import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Note, NoteDocument } from '../../modules/notes/note.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NoteUpdaterequestDto } from 'src/common/dto/notes/request/note-update.dto';
import { NoteDto } from 'src/common/dto/notes/note.dto';
import { NoteResponseDto } from 'src/common/dto/notes/response/note-response.dto';

@Injectable()
export class NotesRepository {
	constructor(
		@InjectModel(Note.name)
		private readonly notesModel: Model<NoteDocument>
	) {}

	async createNote(updatedData: NoteDto): Promise<any> {
		return await this.notesModel.create(updatedData);
	}
	async getAllNote(): Promise<NoteDocument[]> {
		try {
			// Retrieve all documents from the NoteModel
			const result = await this.notesModel.find().exec();

			return result || []; // Return the result if it's truthy, otherwise return an empty array.
		} catch (error) {
			console.log('Error when getting notes from repository:', error);
			throw error;
		}
	}

	// async getPhoto(id: number): Promise<{ data: Buffer; type: string } | null> {
	// 	try {
	// 		const note: NoteDocument | null = await this.notesModel.findById(id);
	// 		if (note && note.photo) {
	// 		} else {
	// 			return null;
	// 		}
	// 	} catch (error) {
	// 		console.error('Repo error getting photo: ');
	// 		throw error;
	// 	}
	// }

	async deleteNotes(id: string): Promise<NoteResponseDto> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const note: NoteDocument | null = await this.notesModel.findOne(query);
		if (!note) {
			throw new NotFoundException('Note not found');
		}
		await note.deleteOne();
		throw new NotFoundException('successufully delete');
	}

	async updateNote(noteParams: NoteUpdaterequestDto): Promise<Note> {
		try {
			const { id, Name, Surname, price, residence } = noteParams;
			const note = await this.notesModel.findById(id);

			if (!note) {
				throw new NotFoundException('Note not found');
			}

			if (Name !== undefined) {
				note.Name = Name;
			}
			if (Surname !== undefined) {
				note.Surname = Surname;
			}
			if (price !== undefined) {
				note.price = price;
			}
			if (residence !== undefined) {
				note.residence = residence;
			}

			await note.save();

			return note;
		} catch (error) {
			throw new NotFoundException('An error occurred while updating');
		}
	}

	// async updateNote(id: string, updatedData: NoteDocument): Promise<NoteDocument> {
	// 	try {
	// 		console.log(`Updating note with ID: ${id}`);

	// 		if (updatedData.price !== undefined) {
	// 			updatedData.price = Number(updatedData.price);
	// 		}

	// 		const updatedNote: NoteDocument | null =
	// 			await this.notesModel.findByIdAndUpdate(id, updatedData, {
	// 				new: true,
	// 			});
	// 		if (!updatedNote) {
	// 			throw new Error('Note not found');
	// 		}

	// 		console.log('Note updated successfully:', updatedNote);
	// 		return updatedNote;
	// 	} catch (error) {
	// 		console.error('Error updating note:');
	// 		throw error;
	// 	}
	// }
}

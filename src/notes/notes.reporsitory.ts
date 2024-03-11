import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NoteModel, NoteDocument } from './note.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NoteParamsDto } from './dto/note-params.dto';
import { AuthResultDto } from './../notes/dto/auth-result.dto';

@Injectable()
export class NotesRepository {
	constructor(
		@InjectModel(NoteModel.name)
		private readonly notesModel: Model<NoteDocument>
	) {}

	async createNote(updatedData: NoteParamsDto): Promise<any> {
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

	async deleteNotes(id: string): Promise<AuthResultDto> {
		const query = { _id: new mongoose.Types.ObjectId(id) };
		const note: NoteDocument | null = await this.notesModel.findOne(query);
		if (!note) {
			return { success: false, message: 'Note not found' };
		}
		await note.deleteOne();
		return { success: true, message: 'Deleted successufully' };
	}

	async updateNote(noteParams: NoteParamsDto): Promise<AuthResultDto> {
		try {
			const { id, Name, Surname, price, residence } = noteParams;
			const query = { _id: new mongoose.Types.ObjectId(id) };
			const note: NoteDocument | null = await this.notesModel.findOne(query);

			if (!note) {
				return { success: false, message: 'Note not found' };
			}

			if (Name) {
				note.Name = Name;
			}
			if (Surname) {
				note.Surname = Surname;
			}
			if (price) {
				note.price = price;
			}
			if (residence) {
				note.residence = residence;
			}

			await note.save(); // Добавлено ожидание сохранения

			return { success: true, message: 'Updated successfully' };
		} catch (error) {
			// Обработка ошибок, если необходимо
			console.error('Error updating note:', error);
			return { success: false, message: 'An error occurred while updating' };
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

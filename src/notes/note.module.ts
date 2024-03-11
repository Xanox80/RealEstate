import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NotesService } from './note.service';
import { NoteModel, NoteSchema } from './note.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesRepository } from './notes.reporsitory';

@Module({
	imports: [MongooseModule.forFeature([{ name: NoteModel.name, schema: NoteSchema }])],
	controllers: [NoteController],
	providers: [NotesRepository, NotesService],
})
export class NoteModule {}

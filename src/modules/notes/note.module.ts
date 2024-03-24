import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NotesService } from './note.service';
import { RepositoryModule } from 'src/repository';

const providers = [NotesService];
const modules = [RepositoryModule];

@Module({
	imports: [...modules],
	controllers: [NoteController],
	providers,
	exports: [...providers],
})
export class NoteModule {}

import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
	AuthRepository,
	ApartmentRepository,
	AppeealRepository,
	NotesRepository,
	UserRepository,
	VillaRepository,
} from './repositories';
import { Apartmen, ApartmentSchema } from 'src/modules/apartment/apartment.schema';
import { Appeal, AppealSchema } from 'src/modules/appeal/appeal.schema';
import { Villa, VillaSchema } from 'src/modules/villa/villa.schema';
import { Note, NoteSchema } from 'src/modules/notes/note.schema';

import { User, UserSchema } from 'src/modules/user/user.schema';
import { ConfigService } from '@nestjs/config';
const providers = [
	ConfigService,
	AuthRepository,
	ApartmentRepository,
	AppeealRepository,
	VillaRepository,
	NotesRepository,
	UserRepository,
];

const models = [
	{ name: Apartmen.name, schema: ApartmentSchema },
	{ name: Appeal.name, schema: AppealSchema },
	{ name: Villa.name, schema: VillaSchema },
	{ name: Note.name, schema: NoteSchema },
	{ name: User.name, schema: UserSchema },
];
@Global()
@Module({
	imports: [MongooseModule.forFeature([...models])],
	controllers: [],
	providers,
	exports: [...providers, MongooseModule.forFeature([...models])],
})
export class RepositoryModule {}

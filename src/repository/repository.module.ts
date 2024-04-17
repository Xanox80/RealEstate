import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
	AuthRepository,
	ApartmentRepository,
	AppeealRepository,
	NotesRepository,
	UserRepository,
	VillaRepository,
	RatingRepository,
	PhotoRepository,
} from './repositories';
import { Apartmen, ApartmentSchema } from 'src/modules/apartment/apartment.schema';
import { Appeal, AppealSchema } from 'src/modules/appeal/appeal.schema';
import { Villa, VillaSchema } from 'src/modules/villa/villa.schema';
import { Note, NoteSchema } from 'src/modules/notes/note.schema';

import { User, UserSchema } from 'src/modules/user/user.schema';
import { ConfigService } from '@nestjs/config';
import { Rating, RatingSchema } from 'src/modules/rating/rating.shema';
import { Photo, PhotoSchema } from 'src/modules/photo/photo.shema';
const providers = [
	ConfigService,
	AuthRepository,
	ApartmentRepository,
	AppeealRepository,
	VillaRepository,
	NotesRepository,
	UserRepository,
	RatingRepository,
	PhotoRepository,
];

const models = [
	{ name: Apartmen.name, schema: ApartmentSchema },
	{ name: Appeal.name, schema: AppealSchema },
	{ name: Villa.name, schema: VillaSchema },
	{ name: Note.name, schema: NoteSchema },
	{ name: User.name, schema: UserSchema },
	{ name: Rating.name, schema: RatingSchema },
	{ name: Photo.name, schema: PhotoSchema },
];
@Global()
@Module({
	imports: [MongooseModule.forFeature([...models])],
	controllers: [],
	providers,
	exports: [...providers, MongooseModule.forFeature([...models])],
})
export class RepositoryModule {}

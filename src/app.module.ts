import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { NoteModule } from './modules/notes/note.module';
import { ApartmentModule } from './modules/apartment/apartment.module';
import { VillaModule } from './modules/villa/villa.module';
import { AppealModule } from './modules/appeal/appeal.module';
import { AuthModule } from './auth/auth.module';
import { RepositoryModule } from './repository';
import { getDbURL } from './config';
import { APP_GUARD } from '@nestjs/core';
import { ratingModule } from './modules/rating/rating.module';
import { PhotoModule } from './modules/photo/photo.module';
import { UserService } from './modules/user/user.service';
import { AtGuard } from './common/guards/jwt-auth.guard';

@Module({
	imports: [
		MongooseModule.forRoot(getDbURL()),
		UserModule,
		NoteModule,
		ApartmentModule,
		VillaModule,
		AppealModule,
		AuthModule,
		RepositoryModule,
		ratingModule,
		PhotoModule,
	],
	controllers: [],
	providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}

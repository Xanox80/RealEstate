import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteModule } from './modules/notes/note.module';
import { ApartmentModule } from './modules/apartment/apartment.module';
import { VillaModule } from './modules/villa/villa.module';
import { AppealModule } from './modules/appeal/appeal.module';
import { AuthModule } from './auth/auth.module';
import { RepositoryModule } from './repository';
import { getDbURL } from './config';
import { ratingModule } from './modules/rating/rating.module';
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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

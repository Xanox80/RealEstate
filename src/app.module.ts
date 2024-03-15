import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteModule } from './notes/note.module';
import { ApartmentModule } from './apartment/apartment.module';
import { VillaModule } from './villa/villa.module';
import { AppealModule } from './appeal/appeal.module';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://127.0.0.1:27017/baza'),
		UserModule,
		NoteModule,
		ApartmentModule,
		VillaModule,
		AppealModule,
		GoogleModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

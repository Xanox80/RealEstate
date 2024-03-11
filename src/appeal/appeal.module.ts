import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AppealController } from './appeal.controller';
import { AppealModel, AppealSchema } from './appeal.schema';
import { AppeealRepository } from './appeal.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AppealService } from './appeal.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: AppealModel.name, schema: AppealSchema }]),
	],
	controllers: [AppealController],
	providers: [AppealService, AppeealRepository],
})
export class AppealModule {}

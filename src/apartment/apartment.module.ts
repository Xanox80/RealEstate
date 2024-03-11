import { Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.serivce';
import { ApartmentModel, ApartmentSchema } from './apartment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentRepository } from './apartment.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: ApartmentModel.name, schema: ApartmentSchema },
		]),
	],
	controllers: [ApartmentController],
	providers: [ApartmentRepository, ApartmentService],
})
export class ApartmentModule {}

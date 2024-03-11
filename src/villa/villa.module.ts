import { Injectable, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VillaController } from './villa.controller';
import { VillaModel, VillaSchema } from './villa.schema';
import { VillaRepository } from './villa.repository';
import { VillaService } from './villa.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: VillaModel.name, schema: VillaSchema }]),
	],
	controllers: [VillaController],
	providers: [VillaRepository, VillaService],
})
export class VillaModule {}

import { Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.serivce';
import { RepositoryModule } from 'src/repository';

const providers = [ApartmentService];
const modules = [RepositoryModule];

@Module({
	imports: [...modules],
	controllers: [ApartmentController],
	providers,
	exports: [...providers],
})
export class ApartmentModule {}

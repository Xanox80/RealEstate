import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RepositoryModule } from 'src/repository';
import { RatingController } from './rating.controller';

const providers = [RatingService];
const modules = [RepositoryModule];

@Module({
	imports: [...modules],
	controllers: [RatingController],
	providers,
	exports: [...providers],
})
export class ratingModule {}

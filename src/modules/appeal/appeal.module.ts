import { Module } from '@nestjs/common';

import { AppealController } from './appeal.controller';
import { AppealService } from './appeal.service';
import { RepositoryModule } from 'src/repository';

const providers = [AppealService];
const modules = [RepositoryModule];

@Module({
	imports: [...modules],
	controllers: [AppealController],
	providers,
	exports: [...providers],
})
export class AppealModule {}

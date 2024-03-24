import { Module } from '@nestjs/common';
import { VillaController } from './villa.controller';
import { VillaService } from './villa.service';
import { RepositoryModule } from 'src/repository';

const providers = [VillaService];
const modules = [RepositoryModule];

@Module({
	imports: [...modules],
	controllers: [VillaController],
	providers,
	exports: [...providers],
})
export class VillaModule {}

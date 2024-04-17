import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { RepositoryModule } from 'src/repository/repository.module';

const providers = [PhotoService];
const modules = [RepositoryModule];

@Module({
	imports: [...modules],
	controllers: [PhotoController],
	providers,
	exports: [...providers],
})
export class PhotoModule {}

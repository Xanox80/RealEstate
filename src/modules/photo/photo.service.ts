// photo.service.ts
import { Injectable } from '@nestjs/common';
import { photoDto } from 'src/common/dto/photo/photo.dto';
import { PhotoRepository } from 'src/repository';
import { Photo } from './photo.shema';

@Injectable()
export class PhotoService {
	constructor(private readonly photoRepository: PhotoRepository) {}

	async createPhoto(photoDto: photoDto): Promise<Photo> {
		return this.photoRepository.createPhoto(photoDto);
	}
	async getPhoto(photoId: string): Promise<Buffer> {
		try {
			const photoBuffer = await this.photoRepository.getPhotoById(photoId);
			return photoBuffer;
		} catch (error) {
			throw new Error(`Помилка при отриманні фотографії: ${error.message}`);
		}
	}
}

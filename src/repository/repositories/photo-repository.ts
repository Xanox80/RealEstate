import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Photo, PhotoDocument } from 'src/modules/photo/photo.shema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PhotoRepository {
	constructor(
		@InjectModel(Photo.name) private readonly photoModel: Model<PhotoDocument>
	) {}

	async createPhoto(file: any): Promise<Photo> {
		try {
			const base64String = await convertToBase64(file);
			const createdPhoto = new this.photoModel({ photoBase64: base64String });
			return createdPhoto.save();
		} catch (error) {
			throw new Error(`Помилка при збереженні фотографії: ${error.message}`);
		}
	}
	async getPhotoById(photoId: string): Promise<Buffer> {
		try {
			const photoRecord = await this.photoModel.findById(photoId);
			if (!photoRecord) {
				throw new Error(`Фотографія з ID ${photoId} не знайдена`);
			}
			const base64String = photoRecord.photoBase64;
			const buffer = Buffer.from(base64String, 'base64');
			return buffer;
		} catch (error) {
			throw new Error(
				`Помилка при отриманні та декодуванні фотографії: ${error.message}`
			);
		}
	}
}

async function convertToBase64(file): Promise<string> {
	if (!file || !file.mimetype.startsWith('image')) {
		return Promise.reject(
			new Error('Будь ласка, виберіть файл у форматі зображення.')
		);
	}

	if (file) {
		const base64String = file.buffer.toString('base64');
		return Promise.resolve(base64String);
	} else {
		throw new Error('Будь ласка, виберіть файл для завантаження.');
	}
}

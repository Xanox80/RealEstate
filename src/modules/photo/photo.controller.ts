import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { PhotoService } from './photo.service';
import { PhotoResponseDto } from 'src/common/dto/photo/response/photo-response.dto';

@Controller('photo')
@ApiTags('Photo')
export class PhotoController {
	constructor(private readonly photoService: PhotoService) {}

	@Post('/createphoto')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ description: 'CreatePhoto' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Photo file',
		type: 'multipart/form-data',
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@ApiResponse({ type: PhotoResponseDto })
	@UseInterceptors(FileInterceptor('file'))
	async createPhoto(@UploadedFile() file: any): Promise<PhotoResponseDto> {
		const createdPhoto = await this.photoService.createPhoto(file);
		return {
			photoBase64: createdPhoto.photoBase64,
		};
	}

	@Get('/getPhoto/:id')
	@ApiOperation({ description: 'GetPhoto' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	async getPhoto(@Param('id') id: string) {
		this.photoService.getPhoto(id);
	}
}

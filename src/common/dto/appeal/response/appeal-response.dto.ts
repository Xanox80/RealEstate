import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { AppealDto } from '../appeal.dto';

export class AppealResponsDto extends AppealDto {
	@ApiProperty({ example: 'I wanna buy a car' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	appeal: string;

	@ApiProperty({ example: '+38029347242432' })
	@IsString()
	@IsNotEmpty()
	@Expose()
	phoneNumber: number;
}

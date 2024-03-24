import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AppealDto {
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

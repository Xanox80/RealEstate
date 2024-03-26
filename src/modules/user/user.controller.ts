import {
	Controller,
	Delete,
	Param,
	HttpCode,
	HttpStatus,
	Body,
	Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto, UserResponseDto, UserUpdateRequestDto } from 'src/common';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/update/:id')
	@ApiOperation({ description: 'UpdateUser' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UserResponseDto })
	@ApiBearerAuth()
	async updateUser(@Param('id') id: string, @Body() userParams: UserUpdateRequestDto) {
		userParams.id = id;
		return this.userService.upDateUser(id, userParams);
	}

	@Delete('/delete/:id')
	@ApiOperation({ description: 'DeleteUser' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	deleteUser(@Param('id') id: string) {
		this.userService.deleteUser(id);
	}
}

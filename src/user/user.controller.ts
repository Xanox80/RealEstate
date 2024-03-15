import {
	Controller,
	Post,
	Delete,
	Param,
	Body,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserRequestDto } from 'src/common/dto/user/request/user-request.dto';
import { UserUpdateRequestDto } from 'src/common/dto/user/request/user-update-request.dto';
import { UserResponseDto } from 'src/common/dto/user/response/user-response.dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/api/login')
	@ApiOperation({ description: 'loginUser' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UserResponseDto })
	loginUser(@Body() userParams: UserRequestDto): Promise<UserResponseDto> {
		return this.userService.loginUser(userParams);
	}

	@Post('/api/create')
	@ApiOperation({ description: 'CreateUser' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UserResponseDto })
	registerUser(@Body() userParams: UserRequestDto) {
		return this.userService.registerUser(userParams);
	}

	@Post('/api/update')
	@ApiOperation({ description: 'UpdateUser' })
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: UserResponseDto })
	@ApiBearerAuth()
	updateUser(@Param('id') id: string, @Body() userParams: UserUpdateRequestDto) {
		return this.userService.updateUser(userParams);
	}

	@Delete('/api/delete/:id')
	@ApiOperation({ description: 'DeleteUser' })
	@HttpCode(HttpStatus.OK)
	@ApiBearerAuth()
	deleteUser(@Param('id') id: string) {
		this.userService.deleteUser(id);
	}
}

// import express, { Request, Response } from 'express';
// import UserService from '../user/user.service';
// import { UserRepository } from '../user/user.repository';
// import UserModel from '../models/user.model';

// const userRouter = express.Router();

// const userRepository = new UserRepository(UserModel);
// const userService = new UserService(userRepository); // HUINJA, PUSAV DAUN, UDALITI POTOM

// userRouter.route('/api/login').post(async (req: Request, res: Response) => {
//   try {
//     const result = await userService.loginUser(
//       req.body.username,
//       req.body.password,
//     );
//     res.send(result);
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).send({ success: false, message: 'Internal server error' });
//   }
// });

// userRouter.route('/api/create').post(async (req: Request, res: Response) => {
//   try {
//     const result = await userService.registerUser(
//       req.body.username,
//       req.body.password,
//     );
//     res.send(result);
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).send({ success: false, message: 'Internal server error' });
//   }
// });

// userRouter
//   .route('/api/update')
//   .put((req: Request, res: Response) => {
//     res.send('update user...');
//   })
//   .delete((req: Request, res: Response) => {
//     res.send('delete user...');
//   });

// export default userRouter;

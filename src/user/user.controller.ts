import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserParamsDto } from './dto/user-params.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/api/login')
  loginUser(@Body() userParams: UserParamsDto) {
    return this.userService.loginUser(userParams);
  }

  @Post('/api/create')
  registerUser(@Body() userParams: UserParamsDto) {
    return this.userService.registerUser(userParams);
  }

  @Post('/api/update')
  updateUser(@Body() userParams: UserParamsDto) {
    return this.userService.updateUser(userParams);
  }

  @Delete('/api/delete/:id')
  deleteUser(@Param() id: string) {
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

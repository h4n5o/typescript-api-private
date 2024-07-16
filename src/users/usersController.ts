// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from 'tsoa';
import { User } from './user';
import { UsersService, UserCreationParams } from './usersService';

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public getUser(@Path() userId: number, @Query() name?: string): User {
    return new UsersService().get(userId, name);
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public createUser(@Body() requestBody: UserCreationParams): void {
    this.setStatus(201); // set return status 201
    new UsersService().create(requestBody);
    return;
  }
}

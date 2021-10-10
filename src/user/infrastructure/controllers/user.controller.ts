import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  import { CreateUsertDto } from './dto/create-user.dto';
  import { User } from '../../domain/user.entity';
  import { UserService } from '../../use-cases/user.service';
  
  @Controller('user')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Get()
    getUsers(): Promise<User[]> {
      return this.userService.getAllUsers();
    }
  
    @Get('/:id')
    getUserById(@Param('id') id: number): Promise<User> {
      return this.userService.getUserById(id);
    }
  
    @Post()
    createUser(@Body() createUserDto: CreateUsertDto): Promise<User> {
      return this.userService.createUser(createUserDto);
    }
  }
  
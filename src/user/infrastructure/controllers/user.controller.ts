import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { CreateUsertDto } from "./dto/create-user.dto";
import { User } from "../../domain/user.entity";
import { UserService } from "../../use-cases/user.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get("/:userName")
  getUserById(@Param("userName") userName: string): Promise<User> {
    return this.userService.getUserById(userName);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUsertDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(updateUserDto);
  }

  @Put("/changePassword")
  changePassword(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.changePassword(updateUserDto);
  }

  @Delete("/:userName")
  deleteUser(@Param("userName") userName: string): Promise<User> {
    return this.userService.deleteUser(userName);
  }

  /*AUTENTICACION*/

  @Get("/login/:userName/:pass")
  login(
    @Param("userName") userName: string,
    @Param("pass") pass: string
  ): Promise<User> {
    console.log("Login controller");
    return this.userService.login(userName, pass);
  }
}

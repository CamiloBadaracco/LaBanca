import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUsertDto } from "./dto/create-user.dto";
import { User as UserEntity } from "../../domain/user.entity";
import { UserService } from "../../use-cases/user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guard";
import { InjectRolesBuilder, RolesBuilder, UseRoles } from "nest-access-control";
import { AppResource } from "src/app.roles";
import { Auth } from "src/auth/common/decorators/auth.decorator";
import { User } from "src/auth/common/decorators/user.decorator";
import { Console } from "console";

@Controller("user")
export class UserController {
  constructor(private userService: UserService, @InjectRolesBuilder() private readonly rolesBuilder: RolesBuilder) {}

  //@UseGuards(JwtAuthGuard)
  // @UseRoles({ possession: "any", action: "create", resource: AppResource.USER })
  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Get("/:userName")
  getUserById(@Param("userName") userName: string): Promise<UserEntity> {
    return this.userService.getUserById(userName);
  }

  //@Auth({ possession: "any", action: "create", resource: AppResource.USER })
  @Post()
  createUser(@Body() createUserDto: CreateUsertDto, @User() userLogued: UserEntity): Promise<UserEntity> {
    // if (this.rolesBuilder.can(userLogued.roles).updateAny(AppResource.USER).granted) {
    return this.userService.createUser(createUserDto);
    /* } else {
      console.log("No tiene privilegios para realizar dicha accion.");
    }*/
  }

  // @Auth({ possession: "own", action: "update", resource: AppResource.USER })
  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto, @User() userLogued: UserEntity): Promise<UserEntity> {
    /*  if (this.rolesBuilder.can(userLogued.roles).updateAny(AppResource.USER).granted) {*/
    return this.userService.updateUser(updateUserDto);
    /* } else {
     
      return this.userService.updateOwnUser(updateUserDto, userLogued);
    }*/
  }
  // @Auth({ possession: "own", action: "update", resource: AppResource.USER })
  @Put("/changePassword")
  changePassword(@Body() updateUserDto: UpdateUserDto, @User() userLogued: UserEntity): Promise<UserEntity> {
    console.log(updateUserDto);
    return this.userService.changePassword(updateUserDto);
  }

  //@Auth({ possession: "own", action: "delete", resource: AppResource.USER })
  // @Put()
  @Delete("/:userName")
  deleteUser(@Param("userName") userName: string /*, @User() userLogued: UserEntity*/): Promise<UserEntity> {
    /* if (this.rolesBuilder.can(userLogued.roles).updateAny(AppResource.USER).granted) {
      console.log("Esto ES un admin");*/
    console.log("entra por aca **********************************");
    return this.userService.deleteUser(userName);
    /* } else {
      console.log("No tiene privilegios para realizar dicha accion.");
    }*/
  }

  /*AUTENTICACION*/
  @Get("/login/:userName/:pass")
  login(@Param("userName") userName: string, @Param("pass") pass: string): Promise<UserEntity> {
    // console.log("Login controller" + " || username: " + userName + "pass" + pass);

    return this.userService.login(userName, pass);
  }
}

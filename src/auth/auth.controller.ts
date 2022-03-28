import { Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User as UserEntity } from "src/user/domain/user.entity";
import { AuthService } from "./auth.service";
import { User } from "./common/decorators/user.decorator";
import { JwtAuthGuard, LocalAuthGuard } from "./guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      messge: "Login exitoso",
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  profile(@User() user: UserEntity) {
    return {
      messge: "pROFILE",
      user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("refresh")
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      messge: "Refresh exitoso",
      data,
    };
  }
}

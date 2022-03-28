import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { retryAttempts } from "ormconfig-migrations";
import { User } from "src/user/domain/user.entity";
import { UserService } from "src/user/use-cases/user.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async vallidateUser(userName: string, pass: string): Promise<any> {
    const user = await this.userService.login(userName, pass);

    if (user) {
      return user;
    }

    return null;
  }

  login(user: User) {
    const { id, ...rest } = user;
    const payload = { sub: id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}

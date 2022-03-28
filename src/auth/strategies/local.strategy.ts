import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly autShervice: AuthService) {
    super({
      usernameField: "userName",
      passwordField: "pass",
    });
  }

  async validate(userName: string, pass: string) {
    const user = await this.autShervice.vallidateUser(userName, pass);
    if (!user) throw new UnauthorizedException("Usuario Incorrecto");
    return user;
  }
}

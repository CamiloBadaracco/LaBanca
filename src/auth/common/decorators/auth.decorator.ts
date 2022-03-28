import { applyDecorators, UseGuards } from "@nestjs/common";
import { ACGuard, UseRoles, Role } from "nest-access-control";
import { JwtAuthGuard } from "src/auth/guard";

export function Auth(...roles: Role[]) {
  return applyDecorators(UseGuards(JwtAuthGuard, ACGuard), UseRoles(...roles));
}

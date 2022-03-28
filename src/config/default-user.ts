import { getRepository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "src/user/domain/user.entity";
import { DEFAULT_USER_NAME, DEFAULT_USER_PASS } from "./constants";
import * as bcryptjs from "bcryptjs";

export const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<User>(User);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where("name=:name", { name: config.get<string>("DEFAULT_USER_NAME") })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      name: config.get<string>(DEFAULT_USER_NAME),
      lastName: config.get<string>(DEFAULT_USER_NAME),
      userName: config.get<string>(DEFAULT_USER_NAME),
      pass: bcryptjs.hashSync(config.get<string>(DEFAULT_USER_PASS), bcryptjs.genSaltSync(10)),
      mail: config.get<string>("mail@mai.com"),
      roles: ["ADMIN"],
    });

    console.log("******************************************************************************************************************************** ");
    console.log("ALTA USUARIO POR DEFECTO ");
    console.log("******************************************************************************************************************************** ");
    return await userRepository.save(adminUser);
  }
};

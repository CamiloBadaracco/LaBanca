import { TypeOrmModuleOptions } from "@nestjs/typeorm";
require("dotenv").config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "postgres",
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "/../**/**/*.entity.{js,ts}"],
  synchronize: true,
  migrations: ["../src/migration/*{.ts,.js}"],
  cli: {
    migrationsDir: "../src/migration/",
  },
};

console.log("Exit --- > TYPEORMCONFIG ");
console.log("  ---------------------------------------  ");
console.log("  host  " + typeOrmConfig.host);
console.log("  port  " + typeOrmConfig.port);
console.log("  username  " + typeOrmConfig.username);
console.log("  password  " + typeOrmConfig.password);
console.log("  database  " + typeOrmConfig.database);
console.log("  synchronize  " + typeOrmConfig.synchronize);
console.log("  entity  " + typeOrmConfig.entities);
console.log("  migrations  " + typeOrmConfig.migrations);
console.log("  migrationsDir  " + typeOrmConfig.cli.migrationsDir);
console.log("  ---------------------------------------  ");

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgentModule } from "./agent/infrastructure/modules/agent.module";
import { typeOrmConfig } from "./config/typeorm.config";
import "reflect-metadata";

import { UserModule } from "./user/infrastructure/modules/user.module";
import { SubAgentModule } from "./subAgent/infrastructure/modules/subAgent.module";
import { AddressModule } from "./address/infrastructure/modules/address.module";
import { ProvisorioModule } from "./provisorio/infrastructure/modules/provisorio.module";
import { ExpedientModule } from "./expedient/infrastructure/modules/expedient.module";
import { NotificationModule } from "./notification/infrastructure/modules/notification.module";

//import { MailModule } from './mail/infrastructure/modules/mail.module';
import { AuthModule } from "./auth/auth.module";
import { AccessControlModule } from "nest-access-control";
import { roles } from "./app.roles";
import { FileModule } from "./file/infrastructure/modules/file.module";
import { MailModule } from "./mail/infrastructure/modules/mail.module";
import { UserAgentModule } from "./userAgent/infrastructure/modules/userAgent.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(),
    AgentModule,
    UserModule,
    SubAgentModule,
    AddressModule,
    ProvisorioModule,
    ExpedientModule,
    NotificationModule,
    AuthModule,
    FileModule,
    ConfigService,
    ConfigModule,
    MailModule,
    UserAgentModule,

    AccessControlModule.forRoles(roles),

    // MailModule,
  ],
})
export class AppModule {}

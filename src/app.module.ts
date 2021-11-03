import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
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
    // MailModule,
  ],
})
export class AppModule {}

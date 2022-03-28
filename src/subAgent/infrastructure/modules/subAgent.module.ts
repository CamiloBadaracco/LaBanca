import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubAgentRepository } from "../repository/subAgent.respository";
import { SubAgentController } from "../controllers/subAgent.controller";

import { NotificationRepository } from "src/notification/infrastructure/repository/notification.repository";
import { NotificationController } from "src/notification/infrastructure/controllers/notification.controller";
import { NotificationService } from "src/notification/use-cases/notification.service";
import { SubAgentService } from "src/subAgent/use-cases/subAgent.service";
import { AgentService } from "src/agent/use-cases/agent.service";
import { AgentController } from "src/agent/infrastructure/controllers/agent.controller";
import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";

import { FileService } from "src/file/file-cases/file.service";
import { FileRepository } from "src/file/infrastructure/repository/file.respository";
import { FileController } from "src/file/infrastructure/controllers/file.controller";
import { MailService } from "src/mail/use-cases/mail.service";
import { MailController } from "src/mail/infrastructure/controllers/mail.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AddressService } from "src/address/use-cases/address.service";
import { ExpedientService } from "src/expedient/use-cases/expedient.service";
import { ProvisorioService } from "src/provisorio/use-cases/provisorio.service";
import { AddressRepository } from "src/address/infrastructure/repository/address.repository";
import { ExpedientRepository } from "src/expedient/infrastructure/repository/expedient.respository";
import { ProvisorioRepository } from "src/provisorio/infrastructure/repository/provisorio.respository";
import { UserAgentService } from "src/userAgent/use-cases/userAgent.service";
import { UserAgentRepository } from "src/userAgent/infrastructure/repository/userAgent.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SubAgentRepository, NotificationRepository, AgentRepository, FileRepository, AddressRepository, ExpedientRepository, ProvisorioRepository, UserAgentRepository])],
  controllers: [SubAgentController, NotificationController, AgentController, FileController, MailController],
  providers: [SubAgentService, NotificationService, AgentService, AddressService, ConfigService, ExpedientService, FileService, MailService, ConfigService, ConfigModule, UserAgentService],
  exports: [SubAgentService, NotificationService, AgentService, AddressService, ConfigService, ExpedientService, FileService, MailService, ConfigService, ConfigModule, UserAgentService],
})
export class SubAgentModule {}

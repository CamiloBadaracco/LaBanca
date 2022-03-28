import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressRepository } from "src/address/infrastructure/repository/address.repository";
import { AgentController } from "src/agent/infrastructure/controllers/agent.controller";
import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";
import { AgentService } from "src/agent/use-cases/agent.service";
import { ExpedientRepository } from "src/expedient/infrastructure/repository/expedient.respository";
import { FileService } from "src/file/file-cases/file.service";
import { FileController } from "src/file/infrastructure/controllers/file.controller";
import { FileRepository } from "src/file/infrastructure/repository/file.respository";
import { MailService } from "src/mail/use-cases/mail.service";
import { NotificationService } from "src/notification/use-cases/notification.service";
import { ProvisorioRepository } from "src/provisorio/infrastructure/repository/provisorio.respository";
import { SubAgentController } from "src/subAgent/infrastructure/controllers/subAgent.controller";
import { SubAgentRepository } from "src/subAgent/infrastructure/repository/subAgent.respository";
import { SubAgentService } from "src/subAgent/use-cases/subAgent.service";
import { UserAgentRepository } from "src/userAgent/infrastructure/repository/userAgent.repository";
import { UserAgentService } from "src/userAgent/use-cases/userAgent.service";
import { NotificationController } from "../controllers/notification.controller";
import { NotificationRepository } from "../repository/notification.repository";

@Module({
  imports: [TypeOrmModule.forFeature([NotificationRepository, SubAgentRepository, AgentRepository, FileRepository, ProvisorioRepository, UserAgentRepository, AddressRepository, ExpedientRepository])],
  controllers: [NotificationController, SubAgentController, AgentController, FileController],
  providers: [NotificationService, AgentService, MailService, ConfigService, SubAgentService, FileService, UserAgentService],
  exports: [NotificationService],
})
export class NotificationModule {}

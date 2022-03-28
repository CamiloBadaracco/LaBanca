import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressRepository } from "../repository/address.repository";
import { AddressController } from "../controllers/address.controller";
import { AddressService } from "../../use-cases/address.service";
import { SubAgentService } from "src/subAgent/use-cases/subAgent.service";
import { SubAgentRepository } from "src/subAgent/infrastructure/repository/subAgent.respository";
import { SubAgentController } from "src/subAgent/infrastructure/controllers/subAgent.controller";
import { NotificationRepository } from "src/notification/infrastructure/repository/notification.repository";
import { NotificationController } from "src/notification/infrastructure/controllers/notification.controller";
import { NotificationService } from "src/notification/use-cases/notification.service";
import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";
import { AgentController } from "src/agent/infrastructure/controllers/agent.controller";
import { AgentService } from "src/agent/use-cases/agent.service";
import { FileRepository } from "src/file/infrastructure/repository/file.respository";
import { FileController } from "src/file/infrastructure/controllers/file.controller";
import { FileService } from "src/file/file-cases/file.service";
import { MailService } from "src/mail/use-cases/mail.service";
import { ConfigService } from "@nestjs/config";
import { UserAgentService } from "src/userAgent/use-cases/userAgent.service";
import { UserAgentRepository } from "src/userAgent/infrastructure/repository/userAgent.repository";
import { ExpedientRepository } from "src/expedient/infrastructure/repository/expedient.respository";
import { ProvisorioRepository } from "src/provisorio/infrastructure/repository/provisorio.respository";

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository, SubAgentRepository, NotificationRepository, AgentRepository, FileRepository, UserAgentRepository, ExpedientRepository, ProvisorioRepository])],
  controllers: [AddressController, SubAgentController, NotificationController, AgentController, FileController],
  providers: [AddressService, SubAgentService, NotificationService, AgentService, FileService, MailService, ConfigService, UserAgentService],
  exports: [AddressService, SubAgentService, NotificationService, AgentService, FileService, UserAgentService],
})
export class AddressModule {}

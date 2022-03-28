import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpedientRepository } from "../repository/expedient.respository";
import { ExpedientController } from "../controllers/expedient.controller";
import { ExpedientService } from "../../use-cases/expedient.service";
import { SubAgentService } from "src/subAgent/use-cases/subAgent.service";
import { SubAgentRepository } from "src/subAgent/infrastructure/repository/subAgent.respository";
import { SubAgentController } from "src/subAgent/infrastructure/controllers/subAgent.controller";
import { NotificationRepository } from "src/notification/infrastructure/repository/notification.repository";
import { NotificationService } from "src/notification/use-cases/notification.service";
import { NotificationController } from "src/notification/infrastructure/controllers/notification.controller";
import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";
import { AgentController } from "src/agent/infrastructure/controllers/agent.controller";
import { AgentService } from "src/agent/use-cases/agent.service";
import { FileRepository } from "src/file/infrastructure/repository/file.respository";
import { FileController } from "src/file/infrastructure/controllers/file.controller";
import { FileService } from "src/file/file-cases/file.service";
import { MailService } from "src/mail/use-cases/mail.service";
import { ConfigService } from "@nestjs/config";
import { AddressService } from "src/address/use-cases/address.service";
import { ProvisorioService } from "src/provisorio/use-cases/provisorio.service";
import { UserService } from "src/user/use-cases/user.service";
import { AddressRepository } from "src/address/infrastructure/repository/address.repository";
import { ProvisorioRepository } from "src/provisorio/infrastructure/repository/provisorio.respository";
import { UserAgentRepository } from "src/userAgent/infrastructure/repository/userAgent.repository";
import { UserAgentService } from "src/userAgent/use-cases/userAgent.service";

@Module({
  imports: [TypeOrmModule.forFeature([ExpedientRepository, SubAgentRepository, NotificationRepository, AgentRepository, FileRepository, AddressRepository, ProvisorioRepository, UserAgentRepository])],
  controllers: [ExpedientController, SubAgentController, NotificationController, AgentController, FileController],
  providers: [ExpedientService, SubAgentService, NotificationService, FileService, MailService, AgentService, ConfigService, UserAgentService],
  exports: [ExpedientService],
})
export class ExpedientModule {}

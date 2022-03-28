import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressRepository } from "src/address/infrastructure/repository/address.repository";
import { AddressService } from "src/address/use-cases/address.service";
import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";
import { AgentService } from "src/agent/use-cases/agent.service";
import { ExpedientRepository } from "src/expedient/infrastructure/repository/expedient.respository";
import { ExpedientService } from "src/expedient/use-cases/expedient.service";
import { MailService } from "src/mail/use-cases/mail.service";
import { NotificationRepository } from "src/notification/infrastructure/repository/notification.repository";
import { NotificationService } from "src/notification/use-cases/notification.service";
import { ProvisorioRepository } from "src/provisorio/infrastructure/repository/provisorio.respository";
import { ProvisorioService } from "src/provisorio/use-cases/provisorio.service";
import { SubAgentController } from "src/subAgent/infrastructure/controllers/subAgent.controller";
import { SubAgentRepository } from "src/subAgent/infrastructure/repository/subAgent.respository";
import { SubAgentService } from "src/subAgent/use-cases/subAgent.service";
import { UserService } from "src/user/use-cases/user.service";

import { FileService } from "../../file-cases/file.service";
import { FileController } from "../controllers/file.controller";
import { FileRepository } from "../repository/file.respository";

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository, AgentRepository, AddressRepository, ExpedientRepository, NotificationRepository, ProvisorioRepository, SubAgentRepository])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}

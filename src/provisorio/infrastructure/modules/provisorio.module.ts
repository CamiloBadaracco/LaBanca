import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProvisorioRepository } from "../repository/provisorio.respository";
import { ProvisorioController } from "../controllers/provisorio.controller";
import { ProvisorioService } from "../../use-cases/provisorio.service";
import { SubAgentService } from "src/subAgent/use-cases/subAgent.service";
import { SubAgentRepository } from "src/subAgent/infrastructure/repository/subAgent.respository";
import { SubAgentController } from "src/subAgent/infrastructure/controllers/subAgent.controller";
import { NotificationRepository } from "src/notification/infrastructure/repository/notification.repository";
import { NotificationController } from "src/notification/infrastructure/controllers/notification.controller";
import { NotificationService } from "src/notification/use-cases/notification.service";
import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";
import { AgentController } from "src/agent/infrastructure/controllers/agent.controller";
import { AgentService } from "src/agent/use-cases/agent.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProvisorioRepository, SubAgentRepository, NotificationRepository, AgentRepository])],
  controllers: [ProvisorioController, SubAgentController, NotificationController, AgentController],
  providers: [ProvisorioService, SubAgentService, NotificationService, AgentService],
  exports: [ProvisorioService, SubAgentService, NotificationService, AgentService],
})
export class ProvisorioModule {}

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

@Module({
  imports: [TypeOrmModule.forFeature([SubAgentRepository, NotificationRepository, AgentRepository])],
  controllers: [SubAgentController, NotificationController, AgentController],
  providers: [SubAgentService, NotificationService, AgentService],
  exports: [SubAgentService, NotificationService, AgentService],
})
export class SubAgentModule {}

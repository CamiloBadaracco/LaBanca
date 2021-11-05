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

@Module({
  imports: [TypeOrmModule.forFeature([ExpedientRepository, SubAgentRepository, NotificationRepository, AgentRepository])],
  controllers: [ExpedientController, SubAgentController, NotificationController, AgentController],
  providers: [ExpedientService, SubAgentService, NotificationService, AgentService],
  exports: [ExpedientService, SubAgentService, NotificationService, AgentService],
})
export class ExpedientModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgentRepository } from "../repository/agent.repository";
import { AgentController } from "../controllers/agent.controller";
import { AgentService } from "../../use-cases/agent.service";
import { NotificationController } from "src/notification/infrastructure/controllers/notification.controller";
import { NotificationRepository } from "src/notification/infrastructure/repository/notification.repository";
import { NotificationService } from "src/notification/use-cases/notification.service";

@Module({
  imports: [TypeOrmModule.forFeature([AgentRepository])],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}

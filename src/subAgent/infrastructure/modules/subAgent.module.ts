import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubAgentRepository } from "../repository/subAgent.respository";
import { SubAgentController } from "../controllers/subAgent.controller";
import { SubAgentService } from "../../use-cases/subAgent.service";
import { NotificationRepository } from "src/notification/infrastructure/repository/notification.repository";
import { NotificationController } from "src/notification/infrastructure/controllers/notification.controller";
import { NotificationService } from "src/notification/use-cases/notification.service";

@Module({
  imports: [TypeOrmModule.forFeature([SubAgentRepository, NotificationRepository])],
  controllers: [SubAgentController, NotificationController],
  providers: [SubAgentService, NotificationService],
  exports: [SubAgentService, NotificationService],
})
export class SubAgentModule {}

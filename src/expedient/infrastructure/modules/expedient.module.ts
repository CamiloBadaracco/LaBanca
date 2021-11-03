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

@Module({
  imports: [TypeOrmModule.forFeature([ExpedientRepository, SubAgentRepository, NotificationRepository])],
  controllers: [ExpedientController, SubAgentController, NotificationController],
  providers: [ExpedientService, SubAgentService, NotificationService],
  exports: [ExpedientService, SubAgentService, NotificationService],
})
export class ExpedientModule {}

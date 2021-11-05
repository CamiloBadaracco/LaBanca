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

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository, SubAgentRepository, NotificationRepository, AgentRepository])],
  controllers: [AddressController, SubAgentController, NotificationController, AgentController],
  providers: [AddressService, SubAgentService, NotificationService, AgentService],
  exports: [AddressService, SubAgentService, NotificationService, AgentService],
})
export class AddressModule {}

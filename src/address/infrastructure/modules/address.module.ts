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

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository, SubAgentRepository, NotificationRepository])],
  controllers: [AddressController, SubAgentController, NotificationController],
  providers: [AddressService, SubAgentService, NotificationService],
  exports: [AddressService, SubAgentService, NotificationService],
})
export class AddressModule {}

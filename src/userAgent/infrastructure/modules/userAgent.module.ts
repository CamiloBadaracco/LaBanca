import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAgentRepository } from "../repository/userAgent.repository";
import { UserAgentController } from "../controllers/userAgent.controller";
import { UserAgentService } from "../../use-cases/userAgent.service";
import { AgentService } from "src/agent/use-cases/agent.service";
import { AgentController } from "src/agent/infrastructure/controllers/agent.controller";
import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserAgentRepository, AgentRepository])],
  controllers: [UserAgentController, AgentController],
  providers: [UserAgentService, AgentService],
  exports: [UserAgentService, AgentService],
})
export class UserAgentModule {}

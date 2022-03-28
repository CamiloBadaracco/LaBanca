import { Module } from "@nestjs/common";
import { MailController } from "../controllers/mail.controller";
import { MailService } from "src/mail/use-cases/mail.service";
import { ConfigService } from "@nestjs/config";
import { AgentService } from "src/agent/use-cases/agent.service";

import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAgentService } from "src/userAgent/use-cases/userAgent.service";
import { UserAgentRepository } from "src/userAgent/infrastructure/repository/userAgent.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AgentRepository, UserAgentRepository])],
  controllers: [MailController],
  providers: [MailService, ConfigService, AgentService, UserAgentService],
  exports: [MailService, ConfigService, AgentService],
})
export class MailModule {}

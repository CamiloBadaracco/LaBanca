import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentRepository } from '../repository/agent.repository';
import { AgentController } from '../controllers/agent.controller';
import { AgentService } from '../../use-cases/agent.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgentRepository])],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}

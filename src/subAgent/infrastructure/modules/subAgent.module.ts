import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubAgentRepository } from '../repository/subAgent.respository';
import { SubAgentController } from '../controllers/subAgent.controller';
import { SubAgentService } from '../../use-cases/subAgent.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubAgentRepository])],
  controllers: [SubAgentController],
  providers: [SubAgentService],
  exports: [SubAgentService],
})
export class SubAgentModule {}

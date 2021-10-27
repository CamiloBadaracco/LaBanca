import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvisorioRepository } from '../repository/provisorio.respository';
import { ProvisorioController } from '../controllers/provisorio.controller';
import { ProvisorioService } from '../../use-cases/provisorio.service';
import { SubAgentService } from 'src/subAgent/use-cases/subAgent.service';
import { SubAgentRepository } from 'src/subAgent/infrastructure/repository/subAgent.respository';
import { SubAgentController } from 'src/subAgent/infrastructure/controllers/subAgent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProvisorioRepository,SubAgentRepository])],
  controllers: [ProvisorioController,SubAgentController],
  providers: [ProvisorioService,SubAgentService],
  exports: [ProvisorioService,SubAgentService],
})
export class ProvisorioModule {}

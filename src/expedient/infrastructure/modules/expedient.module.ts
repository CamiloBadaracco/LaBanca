import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedientRepository } from '../repository/expedient.respository';
import { ExpedientController } from '../controllers/expedient.controller';
import { ExpedientService } from '../../use-cases/expedient.service';
import { SubAgentService } from 'src/subAgent/use-cases/subAgent.service';
import { SubAgentRepository } from 'src/subAgent/infrastructure/repository/subAgent.respository';
import { SubAgentController } from 'src/subAgent/infrastructure/controllers/subAgent.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ExpedientRepository,SubAgentRepository])],
  controllers: [ExpedientController,SubAgentController],
  providers: [ExpedientService,SubAgentService],
  exports: [ExpedientService,SubAgentService],
})
export class ExpedientModule {}

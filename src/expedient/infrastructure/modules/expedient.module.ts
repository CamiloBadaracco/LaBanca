import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedientRepository } from '../repository/expedient.respository';
import { ExpedientController } from '../controllers/expedient.controller';
import { ExpedientService } from '../../use-cases/expedient.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpedientRepository])],
  controllers: [ExpedientController],
  providers: [ExpedientService],
  exports: [ExpedientService],
})
export class ExpedientModule {}

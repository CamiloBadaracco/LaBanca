import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvisorioRepository } from '../repository/provisorio.respository';
import { ProvisorioController } from '../controllers/provisorio.controller';
import { ProvisorioService } from '../../use-cases/provisorio.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProvisorioRepository])],
  controllers: [ProvisorioController],
  providers: [ProvisorioService],
  exports: [ProvisorioService],
})
export class ProvisorioModule {}

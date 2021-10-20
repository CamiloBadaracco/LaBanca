import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from '../repository/address.repository';
import { AddressController } from '../controllers/address.controller';
import { AddressService } from '../../use-cases/address.service';
import { SubAgentService } from 'src/subAgent/use-cases/subAgent.service';
import { SubAgentRepository } from 'src/subAgent/infrastructure/repository/subAgent.respository';
import { SubAgentController } from 'src/subAgent/infrastructure/controllers/subAgent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository,SubAgentRepository],)],
  controllers: [AddressController,SubAgentController],
  providers: [AddressService,SubAgentService],
  exports: [AddressService,SubAgentService],
})
export class AddressModule {}

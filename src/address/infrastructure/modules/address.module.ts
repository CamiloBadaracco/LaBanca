import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from '../repository/address.repository';
import { AddressController } from '../controllers/address.controller';
import { AddressService } from '../../use-cases/address.service';
import { SubAgentService } from 'src/subAgent/use-cases/subAgent.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository])],
  controllers: [AddressController],
  providers: [AddressService,SubAgentService],
  exports: [AddressService],
})
export class AddressModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from '../repository/address.repository';
import { AddressController } from '../controllers/address.controller';
import { AddressService } from '../../use-cases/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
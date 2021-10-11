import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from '../../domain/address.entity';
import { AddressService } from '../../use-cases/address.service';

@Controller('address')
export class AddressController {
  constructor(private addresssService: AddressService) {}

  @Get()
  getAddresss(): Promise<Address[]> {
    return this.addresssService.getAllAddresss();
  }

  @Get('/:id')
  getAddressById(@Param('id') id: number): Promise<Address> {
    return this.addresssService.getAddressById(id);
  }

  @Post()
  createAddress(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addresssService.createAddress(createAddressDto);
  }
}

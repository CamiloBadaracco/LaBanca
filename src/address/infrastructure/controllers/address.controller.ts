import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from '../../domain/address.entity';
import { AddressService } from '../../use-cases/address.service';
import { UpdateAddressDto } from './dto/update-address.dto';

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

  @Put()
  updateAddress(@Body() updateAddressDto: UpdateAddressDto): Promise<Address> {
    return this.addresssService.updateAddress(updateAddressDto);
  }

  /*
  @Delete()
  deleteAddress(@Param('id') id: number):Promise<Address>{
    return this.addresssService.deleteAddress(id);
  }
*/
/*
  @Patch('/state/:id')
  updateStateAddress(@Param('id') id: number) {
  this.addresssService.updateStateAddress(id);
  }*/
  
}

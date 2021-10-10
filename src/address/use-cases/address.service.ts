import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../domain/address.entity';
import { CreateAddressDto } from '../infrastructure/controllers/dto/create-address.dto';
import { AddressRepository } from '../infrastructure/repository/address.repository';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
  ) {}

  async getAllAddresss(): Promise<Address[]> {
    return this.addressRepository.getAddresss();
  }

  async getAddressById(id: number): Promise<Address> {
    const found = await this.addressRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }

    return found;
  }

  

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.addressRepository.createAddress(createAddressDto);
  }
}

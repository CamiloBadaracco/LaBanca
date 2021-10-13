import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../domain/address.entity';
import { CreateAddressDto } from '../infrastructure/controllers/dto/create-address.dto';
import { UpdateAddressDto } from '../infrastructure/controllers/dto/update-address.dto';
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

  
  async updateAddress(updateAddressDto: UpdateAddressDto): Promise<Address> {
    return await this.addressRepository.updateAddress(updateAddressDto);
  }
  
  async deleteAddress(id: number): Promise<Address>{
     return await this.addressRepository.deleteAddress(id);
  }



  
  async updateStateAddress(id: number): Promise<Address>{
    
    const found = await this.addressRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }

    var stateUpdating= false;
    if (found.active == false) {
      var stateUpdating= true;
    }

    //SI O SI TENGO QUE SETEAR TODOS LOS ATRIBUTOS SI QUIERO CAMBIAR SOLO UNO ?
    var addUpdate = new Address();
    addUpdate.id             = found.id;
    addUpdate.department     =  found.department;
    addUpdate.location       =  found.location;
    addUpdate.observationAddress   =  found.observationAddress;
    addUpdate.streetName     =  found.streetName;
    addUpdate.streetNumber   =  found.streetNumber;
    addUpdate.apto           =  found.apto;
    addUpdate.active         =  stateUpdating;

 
      
    return await this.addressRepository.updateStateAddress(addUpdate);
  }


}

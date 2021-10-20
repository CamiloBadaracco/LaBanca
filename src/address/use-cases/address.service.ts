import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubAgentService } from 'src/subAgent/use-cases/subAgent.service';
import { Address } from '../domain/address.entity';
import { CreateAddressDto } from '../infrastructure/controllers/dto/create-address.dto';
import { UpdateAddressDto } from '../infrastructure/controllers/dto/update-address.dto';
import { AddressRepository } from '../infrastructure/repository/address.repository';


@Injectable()
export class AddressService {
  constructor(@InjectRepository(AddressRepository)private addressRepository: AddressRepository, private subAgentService: SubAgentService ) {}

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

  async createAddress( createAddressDto: CreateAddressDto): Promise<Address> {

  
    //NumeroSubAgency
    let subAgencyNumber = createAddressDto.subAgencyNumber;
    console.log('SubAgency recibido: '+ subAgencyNumber);

    //Obtengo SubAgente por numero de sub agente y me quedo con la address viva.
    let address =  await (await this.subAgentService.getSubAgentBySubAgencyNumber(subAgencyNumber)).address[0];

  
    console.log(address.department);
 
    //Si hay address viva, hago update para cambiar de estado
    if (address) {
      address.active = false;
     let addressModificada =  this.addressRepository.updateStateAddress(address);
     console.log('Modificada : ' + (await addressModificada).department)

    }


     
    //Creo nueva addres
    return await this.addressRepository.createAddress( createAddressDto);
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
    addUpdate.observation   =  found.observation;
    addUpdate.streetName     =  found.streetName;
    addUpdate.streetNumber   =  found.streetNumber;
    addUpdate.apto           =  found.apto;
    addUpdate.active         =  stateUpdating;

 
      
    return await this.addressRepository.updateStateAddress(addUpdate);
  }


}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubAgent } from 'src/subAgent/domain/subAgent.entity';
import { CreateSubAgenttDto } from 'src/subAgent/infrastructure/controllers/dto/create-subAgent.dto';
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

  async createAddress( createAddressDto: CreateAddressDto): Promise<SubAgent> {

  
    //NumeroSubAgency
    let subAgencyNumber = createAddressDto.subAgencyNumber;
    console.log('SubAgency recibido: '+ subAgencyNumber);

    //Obtengo SubAgente por numero de sub agente y me quedo con la address viva.
    let subagent =  await this.subAgentService.getSubAgentBySubAgencyNumber(subAgencyNumber);

   
    
    //Si hay address viva, hago update para cambiar de estado
    if (subagent.address.length > 0 ) 
    {
      subagent.address.filter(addr => addr.active == true ).forEach(addr => {
        addr.active = false;  
      
        this.addressRepository.updateStateAddress(addr);
      });
    }
 
 
    const objAdd = new Address();
    objAdd.id = 10000;
    objAdd.location = createAddressDto.location;
    objAdd.department= createAddressDto.department;
    objAdd.active = true;
    objAdd.streetName =createAddressDto.streetName;
    objAdd.streetNumber = createAddressDto.streetNumber;
    objAdd.apto=createAddressDto.apto;
    objAdd.observation = createAddressDto.observation; 
     
   
    const createSubAgentDto= new  CreateSubAgenttDto();
 
    createSubAgentDto.subAgencyNumber = subagent.subAgencyNumber;
    createSubAgentDto.documentNumber = subagent.documentNumber;
    createSubAgentDto.name = subagent.name;
    createSubAgentDto.passportPhoto = subagent.passportPhoto;
    createSubAgentDto.certificateGoodConduct = subagent.certificateGoodConduct;
    createSubAgentDto.rut = subagent.rut;
    createSubAgentDto.literalE = subagent.literalE;
    createSubAgentDto.patentNumber = subagent.patentNumber;
    createSubAgentDto.certificateNumber = subagent.certificateNumber;
    createSubAgentDto.address =  objAdd;
    createSubAgentDto.expedient =  subagent.expedient[0];
    createSubAgentDto.provisorio =  subagent.provisorio[0];
    console.log(createAddressDto.subAgencyNumber);
 
    let subAgentResul = null;
    //Creo nuevo subAgentConAddress
      subAgentResul = await this.subAgentService.createSubAgent(createSubAgentDto);
      return subagent;
  
 
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

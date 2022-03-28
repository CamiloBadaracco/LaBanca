import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";
import { CreateSubAgentDto } from "src/subAgent/infrastructure/controllers/dto/create-subAgent.dto";
import { SubAgentService } from "src/subAgent/use-cases/subAgent.service";
import { Address } from "../domain/address.entity";
import { CreateAddressDto } from "../infrastructure/controllers/dto/create-address.dto";
import { UpdateAddressDto } from "../infrastructure/controllers/dto/update-address.dto";
import { AddressRepository } from "../infrastructure/repository/address.repository";

@Injectable()
export class AddressService {
  constructor(@InjectRepository(AddressRepository) private addressRepository: AddressRepository, private subAgentService: SubAgentService) {}

  async getAllAddresss(): Promise<Address[]> {
    return this.addressRepository.getAddresss();
  }

  getAddessEnable(): Promise<Address[]> {
    return this.addressRepository.getAddessEnable();
  }

  async getAddressById(id: number): Promise<Address> {
    const found = await this.addressRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }

    return found;
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<SubAgent> {
    let subAgencyNumber = createAddressDto.subAgencyNumber;

    //Obtengo SubAgente por numero de sub agente y me quedo con la address viva.
    let subagent = await this.subAgentService.getAllSubAgentBySubAgencyNumber(subAgencyNumber);

    //Si hay address viva, hago update para cambiar de estado
    if (subagent.address.length > 0) {
      subagent.address.forEach((addr) => {
        if (addr.active == true) {
          addr.active = false;
        }
      });
    }

    const objAdd = new Address();
    objAdd.id = 0;
    objAdd.location = createAddressDto.location;
    objAdd.department = createAddressDto.department;
    objAdd.active = true;
    objAdd.streetName = createAddressDto.streetName;
    objAdd.streetNumber = createAddressDto.streetNumber;
    objAdd.apto = createAddressDto.apto;
    objAdd.observation = createAddressDto.observation;
    objAdd.dateOfUpdated = new Date();

    subagent.address.push(objAdd);

    return await this.subAgentService.updateSubAgentAux(subagent);
  }

  async updateAddress(updateAddressDto: UpdateAddressDto): Promise<SubAgent> {
    let subAgencyNumber = updateAddressDto.subAgencyNumber;

    //Obtengo SubAgente por numero de sub agente y me quedo con la address viva.
    let subagent = await this.subAgentService.getAllSubAgentBySubAgencyNumber(subAgencyNumber);

    //Si hay address viva, hago update para cambiar de estado
    if (subagent.address.length > 0) {
      const objAdd = new Address();

      // objAdd.id = 15;
      let res = subagent.address.filter((adr) => adr.active == true);

      objAdd.id = res[0].id;
      objAdd.location = updateAddressDto.location;
      objAdd.department = updateAddressDto.department;
      objAdd.streetName = updateAddressDto.streetName;
      objAdd.streetNumber = updateAddressDto.streetNumber;
      objAdd.apto = updateAddressDto.apto;
      objAdd.observation = updateAddressDto.observation;

      this.addressRepository.updateAddress(objAdd);
    }

    return await subagent;
  }

  async deleteAddress(id: number): Promise<Address> {
    return await this.addressRepository.deleteAddress(id);
  }

  async updateStateAddress(id: number): Promise<Address> {
    const found = await this.addressRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }

    var stateUpdating = false;
    if (found.active == false) {
      var stateUpdating = true;
    }

    var addUpdate = new Address();
    addUpdate.id = found.id;
    addUpdate.department = found.department;
    addUpdate.location = found.location;
    addUpdate.observation = found.observation;
    addUpdate.streetName = found.streetName;
    addUpdate.streetNumber = found.streetNumber;
    addUpdate.apto = found.apto;
    addUpdate.active = stateUpdating;
    addUpdate.dateOfUpdated = found.dateOfUpdated;

    return await this.addressRepository.updateStateAddress(addUpdate);
  }
}

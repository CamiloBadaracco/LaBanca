import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Provisorio } from "../domain/provisorio.entity";
import { CreateProvisoriotDto } from "../infrastructure/controllers/dto/create-provisorio.dto";
import { UpdateProvisorioDto } from "../infrastructure/controllers/dto/update-provisorio.dto";
import { ProvisorioRepository } from "../infrastructure/repository/provisorio.respository";
import { SubAgentService } from "src/subAgent/use-cases/subAgent.service";
import { CreateSubAgentDto } from "src/subAgent/infrastructure/controllers/dto/create-subAgent.dto";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";
import { SubAgentController } from "src/subAgent/infrastructure/controllers/subAgent.controller";

@Injectable()
export class ProvisorioService {
  constructor(@InjectRepository(ProvisorioRepository) private provisorioRepository: ProvisorioRepository, private subAgentService: SubAgentService, private subAgentController: SubAgentController) {}

  async getAllProvisorios(): Promise<Provisorio[]> {
    return this.provisorioRepository.getProvisorios();
  }

  getEnabledProvisorio(): Promise<Provisorio[]> {
    return this.provisorioRepository.getEnabledProvisorio();
  }

  async getProvisorioById(id: number): Promise<Provisorio> {
    const found = await this.provisorioRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Provisorio with ID "${id}" not found`);
    }

    return found;
  }

  async createProvisorio(createProvisorioDto: CreateProvisoriotDto): Promise<SubAgent> {
    let subAgencyNumber = createProvisorioDto.subAgencyNumber;

    console.log("createProvisorioDto");
    console.log(createProvisorioDto);
    console.log("----------------------");
    //Obtengo SubAgente por numero de sub agente y me quedo con la address viva.
    let subagent = await this.subAgentService.getAllSubAgentBySubAgencyNumber(subAgencyNumber);

    //Si hay provisorio vivo, hago update para cambiar de estado
    if (subagent.provisorio.length > 0) {
      subagent.provisorio.forEach((prov) => {
        if (prov.active == true) {
          prov.active = false;
        }
      });
    }

    const objProv = new Provisorio();
    objProv.id = 1000;
    objProv.dateOfUpdated = new Date();
    objProv.active = true;
    objProv.url = createProvisorioDto.url;
    objProv.observation = createProvisorioDto.observation;

    subagent.provisorio.push(objProv);

    return await this.subAgentService.updateSubAgentAux(subagent);
  }

  async updateProvisorio(updateProvisorioDto: UpdateProvisorioDto): Promise<Provisorio> {
    return await this.provisorioRepository.updateProvisorio(updateProvisorioDto);
  }

  async deleteProvisorio(id: number): Promise<Provisorio> {
    return await this.provisorioRepository.deleteProvisorio(id);
  }

  async updateStateProvisorio(id: number): Promise<Provisorio> {
    const found = await this.provisorioRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Provisorio with ID "${id}" not found`);
    }

    var stateUpdating = false;
    if (found.active == false) {
      var stateUpdating = true;
    }

    var provUpdate = new Provisorio();
    provUpdate.id = found.id;
    provUpdate.url = found.url;
    provUpdate.observation = found.observation;
    provUpdate.active = stateUpdating;
    provUpdate.dateOfUpdated = found.dateOfUpdated;

    return await this.provisorioRepository.updateStateProvisorio(provUpdate);
  }
}

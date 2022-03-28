import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";
import { Expedient } from "../domain/expedient.entity";
import { CreateExpedientDto } from "../infrastructure/controllers/dto/create-expedient.dto";
import { UpdateExpedientDto } from "../infrastructure/controllers/dto/update-expedient.dto";
import { ExpedientRepository } from "../infrastructure/repository/expedient.respository";
import { SubAgentService } from "src/subAgent/use-cases/subAgent.service";

@Injectable()
export class ExpedientService {
  constructor(@InjectRepository(ExpedientRepository) private expedientRepository: ExpedientRepository, private subAgentService: SubAgentService) {}

  async getAllExpedients(): Promise<Expedient[]> {
    return this.expedientRepository.getExpedients();
  }

  async getEnableExpedient(): Promise<Expedient[]> {
    return this.expedientRepository.getEnableExpedient();
  }

  async getExpedientById(id: number): Promise<Expedient> {
    try {
      const found = await this.expedientRepository.findOne({ where: { id } });

      if (!found) {
        throw new NotFoundException(`Expedient with ID "${id}" not found`);
      }

      return found;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async createExpedient(creExpDto: CreateExpedientDto): Promise<SubAgent> {
    try {
      let subAgencyNumber = creExpDto.subAgencyNumber;

      //Obtengo SubAgente por numero de sub agente y me quedo con la address viva.
      let subagent = await this.subAgentService.getAllSubAgentBySubAgencyNumber(subAgencyNumber);

      if (subagent.expedient.length > 0) {
        subagent.expedient.forEach((exp) => {
          if (exp.active == true) {
            exp.active = false;
          }
        });
      }

      let objExpedient = new Expedient();
      objExpedient.expedientNumber = creExpDto.expedientNumber;
      objExpedient.url = creExpDto.url;
      objExpedient.observation = creExpDto.observation;
      objExpedient.active = true;
      objExpedient.dateOfUpdated = new Date();

      subagent.expedient.push(objExpedient);

      return await this.subAgentService.updateSubAgentAux(subagent);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async updateExpedient(updateExpedientsDto: UpdateExpedientDto): Promise<Expedient> {
    try {
      const { expedientNumber, url, observation, active } = updateExpedientsDto;

      const expedient = new Expedient();
      expedient.expedientNumber = parseInt(expedientNumber.toString());
      expedient.url = null;
      expedient.observation = observation;
      expedient.active = active;
      return await this.expedientRepository.updateExpedient(expedient);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async deleteExpedient(id: number): Promise<Expedient> {
    try {
      return await this.expedientRepository.deleteExpedient(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async updateStateExpedient(id: number): Promise<Expedient> {
    try {
      const expedient = await this.expedientRepository.findOne({ where: { id } });
      if (!expedient) {
        throw new NotFoundException(`Expedient with ID "${id}" not found`);
      }

      if (expedient.active == false) {
        expedient.active = true;
      }

      return await this.expedientRepository.updateStateExpedient(expedient);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}

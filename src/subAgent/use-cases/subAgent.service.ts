import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNotificationDto } from "src/notification/infrastructure/controllers/dto/create-notification.dto";
import { NotificationRepository } from "src/notification/infrastructure/repository/notification.repository";
import { NotificationService } from "src/notification/use-cases/notification.service";

import { SubAgent } from "../domain/subAgent.entity";
import { CreateSubAgenttDto } from "../infrastructure/controllers/dto/create-subAgent.dto";
import { UpdateSubAgentDto } from "../infrastructure/controllers/dto/update-subAgent.dto";
import { SubAgentRepository } from "../infrastructure/repository/subAgent.respository";

@Injectable()
export class SubAgentService {
  constructor(@InjectRepository(SubAgentRepository) private subAgentRepository: SubAgentRepository, private notificationRepository: NotificationRepository) {}

  async getAllSubAgents(): Promise<SubAgent[]> {
    return this.subAgentRepository.getSubAgents();
  }

  async getSubAgentBySubAgencyNumber(subAgencyNumber: string): Promise<SubAgent> {
    const found = await this.subAgentRepository.findOne({
      where: { subAgencyNumber },
      relations: ["address", "provisorio", "expedient"],
    });
    if (!found) {
      return null;
      throw new NotFoundException(`SubAgent with subAgencyNumber "${subAgencyNumber}" not found`);
    }

    found.address = found.address.filter((adr) => adr.active == true);
    found.expedient = found.expedient.filter((exp) => exp.active == true);
    found.provisorio = found.provisorio.filter((pro) => pro.active == true);

    return found;
  }

  async getSubAgentByDocumentNumber(documentNumber: string): Promise<SubAgent> {
    const found = await this.subAgentRepository.findOne({
      where: { documentNumber },
      relations: ["address", "provisorio", "expedient"],
    });

    if (!found) {
      return null;
      throw new NotFoundException(`SubAgent with subAgencyNumber "${documentNumber}" not found`);
    }

    found.address = found.address.filter((adr) => adr.active == true);
    found.expedient = found.expedient.filter((exp) => exp.active == true);
    found.provisorio = found.provisorio.filter((pro) => pro.active == true);

    return found;
  }

  async getSubAgentById(id: number): Promise<SubAgent> {
    const found = await this.subAgentRepository.findOne({
      where: { id },
      relations: ["address", "provisorio", "expedient"],
    });

    if (!found) {
      throw new NotFoundException(`SubAgent with ID "${id}" not found`);
    }
    return found;
  }

  async createSubAgent(createSubAgentDto: CreateSubAgenttDto): Promise<SubAgent> {
    let id = 0;
    const found = await this.getSubAgentBySubAgencyNumber(createSubAgentDto.subAgencyNumber);

    if (found) {
      id = found.id;
    }

    /*Alta notificacion*/
    let notif = new CreateNotificationDto();
    notif.title = "Banca de quinielas de Pando. Alta Sub-Agent " + found.subAgencyNumber;
    notif.actionDescription = "Se realizo alta del subAgente: " + found.subAgencyNumber + ", Nombre : " + found.name;
    notif.agency = found.agent.agencyNumber;
    notif.agencyMail = found.agent.mail;
    notif.subAgencyModified = found.subAgencyNumber;

    // await this.notificationService.createNotification(notif);
    return this.subAgentRepository.createSubAgent(id, createSubAgentDto);
  }

  async updateSubAgent(updateSubAgentDto: UpdateSubAgentDto): Promise<SubAgent> {
    return await this.subAgentRepository.updateSubAgent(updateSubAgentDto);
  }

  async deleteSubAgent(id: number): Promise<SubAgent> {
    return await this.subAgentRepository.deleteSubAgent(id);
  }

  async updateStateSubAgent(subAgencyNumber: string): Promise<SubAgent> {
    const found = await this.subAgentRepository.findOne({
      where: { subAgencyNumber },
    });
    if (!found) {
      throw new NotFoundException(`SubAgent with ID "${subAgencyNumber}" not found`);
    }

    if (!found.active) {
      found.active = true;
    } else {
      found.active = false;
    }

    ///Hacer antes de la notificacion, devolver objeto , si devuelve obejto dio de alta, asi que doy de alta notif y despues de eso si devulvo objeto
    return await this.subAgentRepository.updateStateSubAgent(found);
  }
}

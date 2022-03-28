import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNotificationDto } from "src/notification/infrastructure/controllers/dto/create-notification.dto";
import { NotificationService } from "src/notification/use-cases/notification.service";
import { FileService } from "src/file/file-cases/file.service";
import { SubAgent } from "../domain/subAgent.entity";
import { CreateSubAgentDto } from "../infrastructure/controllers/dto/create-subAgent.dto";
import { SubAgentRepository } from "../infrastructure/repository/subAgent.respository";
import { MailService } from "src/mail/use-cases/mail.service";
import { SendMailDto } from "src/mail/infrastructure/controllers/dto/send-mail.dto";

import { AgentService } from "src/agent/use-cases/agent.service";
import { Provisorio } from "src/provisorio/domain/provisorio.entity";
import { Expedient } from "src/expedient/domain/expedient.entity";
import { Address } from "src/address/domain/address.entity";
import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";

import { AddressRepository } from "src/address/infrastructure/repository/address.repository";
import { ExpedientRepository } from "src/expedient/infrastructure/repository/expedient.respository";
import { ProvisorioRepository } from "src/provisorio/infrastructure/repository/provisorio.respository";

@Injectable()
export class SubAgentService {
  constructor(@InjectRepository(SubAgentRepository) private subAgentRepository: SubAgentRepository, private notificationService: NotificationService, private fileService: FileService, private MailService: MailService, private agentService: AgentService, private agentRespository: AgentRepository, private addressRepository: AddressRepository, private expedientRepository: ExpedientRepository, private provisorioRepository: ProvisorioRepository) {}

  async getAllSubAgents(): Promise<SubAgent[]> {
    const found = this.subAgentRepository.getSubAgents();

    return found;
  }

  async getEnableSubAgents(): Promise<SubAgent[]> {
    return await this.subAgentRepository.getEnableSubAgents();
  }

  async getSubAgentBySubAgencyNumber(subAgencyNumber: string): Promise<SubAgent> {
    const found = await this.subAgentRepository.findOne({
      where: { subAgencyNumber },
      relations: ["address", "provisorio", "expedient", "agent"],
    });
    if (!found) {
      return null;
    }

    found.address = found.address.filter((adr) => adr.active == true);
    found.expedient = found.expedient.filter((exp) => exp.active == true);
    found.provisorio = found.provisorio.filter((pro) => pro.active == true);

    return found;
  }

  async getAllSubAgentBySubAgencyNumber(subAgencyNumber: string): Promise<SubAgent> {
    //Sin el filtro de tuplas vivas
    const found = await this.subAgentRepository.findOne({
      where: { subAgencyNumber },
      relations: ["address", "provisorio", "expedient", "agent"],
    });
    if (!found) {
      return null;
    }

    return found;
  }

  async getSubAgentByDocumentNumber(documentNumber: string): Promise<SubAgent> {
    const found = await this.subAgentRepository.findOne({
      where: { documentNumber },
      relations: ["address", "provisorio", "expedient", "agent"],
    });

    if (!found) {
      return null;
    }

    found.address = found.address.filter((adr) => adr.active == true);
    found.expedient = found.expedient.filter((exp) => exp.active == true);
    found.provisorio = found.provisorio.filter((pro) => pro.active == true);

    return found;
  }

  async getSubAgentById(id: number): Promise<SubAgent> {
    const found = await this.subAgentRepository.findOne({
      where: { id },
      relations: ["address", "provisorio", "expedient", "agent"],
    });

    if (!found) {
      throw new NotFoundException(`SubAgent with ID "${id}" not found`);
    }
    return found;
  }

  async createSubAgent(createSubAgentDto: CreateSubAgentDto): Promise<SubAgent> {
    const { subAgencyNumber, documentNumber, firstName, secondFirstName, firstLastName, secondLastName, name, rut, literalE, address, expedient, provisorio, listDocumentCargados } = createSubAgentDto;

    let id = 10000;
    const found = await this.getSubAgentBySubAgencyNumber(createSubAgentDto.subAgencyNumber);

    if (found) {
      id = found.id;
    }

    const subAgent = new SubAgent();
    subAgent.id = id;
    subAgent.subAgencyNumber = subAgencyNumber;
    subAgent.documentNumber = documentNumber;
    subAgent.firstName = firstName;
    subAgent.secondFirstName = secondFirstName;
    subAgent.firstLastName = firstLastName;
    subAgent.secondLastName = secondLastName;
    subAgent.name = name;
    subAgent.rut = rut;
    subAgent.literalE = literalE;
    subAgent.active = true;

    subAgent.documentIdPhoto = "";
    subAgent.formNineHundred = "";
    subAgent.passportPhoto = "";
    subAgent.certificateGoodConduct = "";
    subAgent.documentDGI = "";
    subAgent.patentNumber = "";
    subAgent.certificateNumber = "";
    subAgent.enabledDocument = "";
    subAgent.cesantiaDocument = "";
    subAgent.changeAddressDocument = "";
    /*expedient.url = "";
    provisorio.url = "";*/

    var expedientAgregar = new Array<Expedient>();
    var provisorioAgregar = new Array<Provisorio>();

    if (listDocumentCargados && listDocumentCargados.length > 0) {
      for (let elemento of listDocumentCargados) {
        if (elemento == "documentIdPhoto") {
          subAgent.documentIdPhoto = "documentIdPhoto";
        } else if (elemento == "formNineHundred") {
          subAgent.formNineHundred = "formNineHundred";
        } else if (elemento == "passportPhoto") {
          subAgent.passportPhoto = "passportPhoto";
        } else if (elemento == "certificateGoodConduct") {
          subAgent.certificateGoodConduct = "certificateGoodConduct";
        } else if (elemento == "documentDGI") {
          subAgent.documentDGI = "documentDGI";
        } else if (elemento == "patentNumber") {
          subAgent.patentNumber = "patentNumber";
        } else if (elemento == "certificateNumber") {
          subAgent.certificateNumber = "certificateNumber";
        } else if (elemento == "enabledDocument") {
          subAgent.enabledDocument = "enabledDocument";
        } else if (elemento == "cesantiaDocument") {
          subAgent.cesantiaDocument = "cesantiaDocument";
        } else if (elemento == "changeAddressDocument") {
          subAgent.changeAddressDocument = "changeAddressDocument";
        }
      }
    }
    //#region   ArmarObj SubAgent

    //agent
    let agent = await this.agentService.getAgentById(createSubAgentDto.agencyNumber);
    if (agent) {
      subAgent.agent = agent;
    }

    expedient.id = 0;
    expedient.dateOfUpdated = new Date();
    if (expedient.expedientNumber < 1) {
      expedient.expedientNumber = 0;
    }

    expedientAgregar.push(expedient);
    subAgent.expedient = expedientAgregar;

    provisorio.id = 0;
    provisorioAgregar.push(provisorio);
    subAgent.provisorio = provisorioAgregar;

    //#endregion

    //#region  Create Object Address

    var addressAgregar = new Array<Address>();
    address.id = 1000;
    address.dateOfUpdated = new Date();
    addressAgregar.push(address);
    subAgent.address = addressAgregar;
    //#endregion

    let resultSubAgent = this.subAgentRepository.createSubAgent(subAgent);
    if (resultSubAgent) {
      let title = "Banca de quinielas de Pando. Alta Sub-Agent " + createSubAgentDto.subAgencyNumber;

      let notif: CreateNotificationDto = this.createNotif(title, createSubAgentDto, agent.agencyNumber, createSubAgentDto.subAgencyNumber, address);

      if (createSubAgentDto.notificar) {
        if (agent) {
          let objMail: SendMailDto = this.createObjectMail(title, notif.actionDescription, createSubAgentDto.agencyNumber);

          this.MailService.UpdateAndSendNotificationMail(objMail);
          notif.sended = true;
        } else {
          //Si no tiene mail no notifico.
          notif.sended = false;
          this.notificationService.createNotification(agent, notif);
          throw new HttpException("No existe mail registrado", 794);
        }
      }
      this.notificationService.createNotification(agent, notif);
    }

    return resultSubAgent;
  }

  createNotif(title: string, createSubAgentDto: CreateSubAgentDto, agencyNumber: string, subAgencyNumber: string, address: Address): CreateNotificationDto {
    let cuerpoMail = "Se realizo alta del subAgente: " + createSubAgentDto.subAgencyNumber + "<br/> Nombre : " + createSubAgentDto.name + "<br/> Documento  : " + createSubAgentDto.documentNumber + "<br/>Direccion  : " + address.department + " - " + address.location + " " + address.streetName + address.streetNumber;

    let notif = new CreateNotificationDto();
    notif.title = title;
    notif.actionDescription = cuerpoMail;
    notif.agencyNumber = agencyNumber;
    notif.subAgencyModified = createSubAgentDto.subAgencyNumber;
    notif.sended = false;

    return notif;
  }

  async updateSubAgent(createSubAgentDto: CreateSubAgentDto): Promise<SubAgent> {
    const { subAgencyNumber, documentNumber, firstName, secondFirstName, firstLastName, secondLastName, name, rut, literalE, address, expedient, provisorio, listDocumentCargados } = createSubAgentDto;

    const subAgent = await this.getAllSubAgentBySubAgencyNumber(createSubAgentDto.subAgencyNumber);

    if (!subAgent) {
      throw new NotFoundException(`SubAgent with ID "${createSubAgentDto.subAgencyNumber}" not found`);
    }

    let agent = await this.agentService.getAgentById(createSubAgentDto.agencyNumber);

    if (agent) {
      subAgent.agent = agent;
    }

    if (listDocumentCargados && listDocumentCargados.length > 0) {
      for (let elemento of listDocumentCargados) {
        if (elemento == "documentIdPhoto") {
          subAgent.documentIdPhoto = "documentIdPhoto";
        } else if (elemento == "formNineHundred") {
          subAgent.formNineHundred = "formNineHundred";
        } else if (elemento == "passportPhoto") {
          subAgent.passportPhoto = "passportPhoto";
        } else if (elemento == "certificateGoodConduct") {
          subAgent.certificateGoodConduct = "certificateGoodConduct";
        } else if (elemento == "documentDGI") {
          subAgent.documentDGI = "documentDGI";
        } else if (elemento == "patentNumber") {
          subAgent.patentNumber = "patentNumber";
        } else if (elemento == "certificateNumber") {
          subAgent.certificateNumber = "certificateNumber";
        } else if (elemento == "enabledDocument") {
          subAgent.enabledDocument = "enabledDocument";
        } else if (elemento == "cesantiaDocument") {
          subAgent.cesantiaDocument = "cesantiaDocument";
        } else if (elemento == "changeAddressDocument") {
          subAgent.changeAddressDocument = "changeAddressDocument";
        }
      }
    }

    //#region  Create Object Address
    var addressAgregar = new Array<Address>();
    var addressList = await this.addressRepository.getAddresss();
    addressList = addressList.filter((adr) => adr.subAgent.subAgencyNumber == createSubAgentDto.subAgencyNumber);
    for (let i = 0; i < addressList.length; i++) {
      if (addressList[i].active == true) {
        // modifico el que esta vivo
        address.id = addressList[i].id;
        addressAgregar.push(address);
      } else {
        // lo deams addres siguen igual
        addressAgregar.push(addressList[i]);
      }
    }
    subAgent.address = addressAgregar;
    //#endregion

    //#region  Create Object Expedient
    var expedientAgregar = new Array<Expedient>();
    var expedientList = await this.expedientRepository.getExpedients();

    expedientList = expedientList.filter((exp) => exp.subAgent.subAgencyNumber == createSubAgentDto.subAgencyNumber);
    for (let i = 0; i < expedientList.length; i++) {
      if (expedientList[i].active == true) {
        // modifico el que esta vivo
        expedient.id = expedientList[i].id;
        if (expedient.url == "NotExist") {
          expedient.url = expedientList[i].url; // Si no le agregaron archivos, se fija y si ya tenia uno lo deja/ si le cargan archivo lo reemplaza,(Al if entra solo cuando no le cargan arvhivo.)
        }
        expedient.dateOfUpdated = new Date();
        if (expedient.expedientNumber < 1) {
          expedient.expedientNumber = 0;
        }
        expedientAgregar.push(expedient);
      } else {
        // lo deams expedient siguen igual
        expedientAgregar.push(expedientList[i]);
      }
    }
    subAgent.expedient = expedientAgregar;

    //#endregion

    //#region  Create Object Provisorio
    var provisorioAgregar = new Array<Provisorio>();
    var provisorioList = await this.provisorioRepository.getProvisorios();

    if (provisorioList && provisorioList.length > 0 && createSubAgentDto.subAgencyNumber) {
      provisorioList = provisorioList.filter((prov) => prov.subAgent.subAgencyNumber == createSubAgentDto.subAgencyNumber);
      for (let e = 0; e < provisorioList.length; e++) {
        if (provisorioList[e].active == true) {
          // modifico el que esta vivo
          if (provisorio.url == "NotExist") {
            provisorio.url = provisorioList[e].url; // Si no le agregaron archivos, se fija y si ya tenia uno lo deja/ si le cargan archivo lo reemplaza,(Al if entra solo cuando no le cargan arvhivo.)
          }

          provisorio.id = subAgent.provisorio[e].id;

          provisorioAgregar.push(provisorio);
        } else {
          // lo deams expedient siguen igual
          provisorioAgregar.push(provisorioList[e]);
        }
      }
    }
    subAgent.provisorio = provisorioAgregar;

    //#endregion

    subAgent.subAgencyNumber = subAgencyNumber;
    subAgent.documentNumber = documentNumber;
    subAgent.firstName = firstName;
    subAgent.secondFirstName = secondFirstName;
    subAgent.firstLastName = firstLastName;
    subAgent.secondLastName = secondLastName;
    subAgent.name = name;
    subAgent.rut = rut;
    subAgent.literalE = literalE;

    return await this.subAgentRepository.updateSubAgent(subAgent);
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

    return await this.subAgentRepository.updateStateSubAgent(found);
  }

  async updateSubAgentAux(updateSubAgent: SubAgent): Promise<SubAgent> {
    return await this.subAgentRepository.updateSubAgentAux(updateSubAgent);
  }

  createObjectMail(title: string, actionDescription: string, agencyNumber: string): SendMailDto {
    let objMail = new SendMailDto();
    objMail.title = title;
    objMail.actionDescription = actionDescription;
    objMail.agencyNumber = agencyNumber;
    return objMail;
  }
}

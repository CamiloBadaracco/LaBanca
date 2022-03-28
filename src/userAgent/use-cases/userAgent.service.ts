import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Exception } from "handlebars";
import { UserAgent } from "../domain/userAgent.entity";
import { CreateUserAgentDto } from "../infrastructure/controllers/dto/create-userAgent.dto";
import { UpdateUserAgentDto } from "../infrastructure/controllers/dto/update-userAgent.dto";
import { UserAgentRepository } from "../infrastructure/repository/userAgent.repository";
import { AgentService } from "src/agent/use-cases/agent.service";
import { AgentRepository } from "src/agent/infrastructure/repository/agent.repository";

@Injectable()
export class UserAgentService {
  constructor(
    @InjectRepository(UserAgentRepository)
    private userAgentRepository: UserAgentRepository,
    private agentService: AgentService,
    private agentRepository: AgentRepository
  ) {}

  async getAllUserAgents(): Promise<UserAgent[]> {
    try {
      return await this.userAgentRepository.getAllUserAgents();
    } catch (err) {
      throw new Exception(err);
    }
  }

  async getEnableUserAgents(): Promise<UserAgent[]> {
    try {
      return await this.userAgentRepository.getEnableUserAgents();
    } catch (err) {
      throw new Exception(err);
    }
  }

  async getUserAgentById(documentUser: string): Promise<UserAgent> {
    try {
      const found = await this.userAgentRepository.findOne({ where: { documentUser } });
      if (!found) throw new NotFoundException(`Usuario no existe: "${documentUser}" .`);

      return found;
    } catch (err) {
      throw new Exception(err);
    }
  }

  async getUserAgentByAgencyNumber(agencyNumber: string): Promise<UserAgent[]> {
    try {
      const found = await this.userAgentRepository.getUserAgentByAgencyNumber(agencyNumber);
      if (!found) throw new NotFoundException(`No existen usuarios para ese Agente : "${agencyNumber}" .`);

      return found;
    } catch (err) {
      throw new Exception(err);
    }
  }

  async createUserAgent(createAgentDto: CreateUserAgentDto): Promise<UserAgent> {
    const { documentUser, agencyNumber, name, firstLastName, secondLastName, mail, observation, listDocumentCargados } = createAgentDto;

    const agentExistent = await this.userAgentRepository.findOne({ where: { documentUser } });

    if (agentExistent) throw new HttpException("El Usuario Agente ya existe.", 797);

    //agent
    let agent = await this.agentService.getAgentById(agencyNumber);

    if (!agent) {
      throw new HttpException("Agente inexistente.", 900);
    }

    const userAgent = new UserAgent();
    userAgent.id = 1000;
    userAgent.documentUser = documentUser;
    userAgent.name = name;
    userAgent.firstLastName = firstLastName;
    userAgent.secondLastName = secondLastName;
    userAgent.mail = mail;
    userAgent.observation = observation;
    userAgent.active = true;
    userAgent.agent = agent;
    userAgent.agencyNumber = agencyNumber;

    userAgent.expedientUp = "";
    userAgent.expedientDown = "";
    userAgent.patentAgent = "";

    if (listDocumentCargados && listDocumentCargados.length > 0) {
      for (let elemento of listDocumentCargados) {
        if (elemento == "expedientUp") {
          userAgent.expedientUp = "expedientUp";
        } else if (elemento == "expedientDown") {
          userAgent.expedientDown = "expedientDown";
        } else if (elemento == "patentAgent") {
          userAgent.patentAgent = "patentAgent";
        }
      }
    }

    console.log("------------- Serv User Agent ------ -----------------/*/**/*/");
    console.log(userAgent);
    console.log("------------------------------------------------/*/**/*/");

    await this.userAgentRepository.createUserAgent(userAgent);

    return userAgent;
  }

  async updateUserAgent(updateUserAgentDto: UpdateUserAgentDto): Promise<UserAgent> {
    try {
      const { id, documentUser, name, firstLastName, secondLastName, mail, expedientUp, expedientDown, patentAgent, observation, active, agencyNumber, listDocumentCargados } = updateUserAgentDto;

      let userAgent = await this.userAgentRepository.findOne({ where: { documentUser } });
      if (!userAgent) throw new NotFoundException(`User with userName "${documentUser}" not found`);

      userAgent.name = name;
      userAgent.firstLastName = firstLastName;
      userAgent.secondLastName = secondLastName;
      userAgent.mail = mail;
      userAgent.expedientUp = expedientUp;
      userAgent.expedientDown = expedientDown;
      userAgent.patentAgent = patentAgent;
      userAgent.observation = observation;
      userAgent.active = true;
      userAgent.agencyNumber = agencyNumber;

      if (listDocumentCargados && listDocumentCargados.length > 0) {
        for (let elemento of listDocumentCargados) {
          if (elemento == "expedientUp") {
            userAgent.expedientUp = "expedientUp";
          } else if (elemento == "expedientDown") {
            userAgent.expedientDown = "expedientDown";
          } else if (elemento == "patentAgent") {
            userAgent.patentAgent = "patentAgent";
          }
        }
      }

      //agent
      let agent = await this.agentService.getAgentById(agencyNumber);
      if (agent) {
        userAgent.agent = agent;
      }

      return await this.userAgentRepository.updateUserAgent(userAgent);
    } catch (err) {
      throw new Exception(err);
    }
  }

  async deleteUserAgent(documentUser: string): Promise<UserAgent> {
    try {
      const found = await this.userAgentRepository.findOne({ where: { documentUser } });
      if (!found) {
        throw new HttpException("No se encotnraron datos para el registro buscado.", 796);
      }

      return await this.userAgentRepository.deleteUserAgent(found.id);
    } catch (err) {
      throw new Exception(err);
    }
  }

  async editStateUserAgent(updateUserAgentDto: UpdateUserAgentDto): Promise<UserAgent> {
    try {
      const { documentUser } = updateUserAgentDto;
      const found = await this.userAgentRepository.findOne({ where: { documentUser } });

      if (!found) {
        throw new HttpException("No se encotnraron registros requerido.", 796);
      }

      if (!found.active) {
        found.active = true;
      } else {
        found.active = false;
      }

      return await this.userAgentRepository.updateStateUserAgent(found);
    } catch (err) {
      throw new Exception(err);
    }
  }
}

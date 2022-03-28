import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Exception } from "handlebars";
import { Agent } from "../domain/agent.entity";
import { CreateAgentDto } from "../infrastructure/controllers/dto/create-agent.dto";
import { UpdateAgentDto } from "../infrastructure/controllers/dto/update-agent.dto";
import { AgentRepository } from "../infrastructure/repository/agent.repository";

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentRepository)
    private agentRepository: AgentRepository
  ) {}

  async getAllAgents(): Promise<Agent[]> {
    try {
      return await this.agentRepository.getAgents();
    } catch (err) {
      throw new Exception(err);
    }
  }

  async getEnableAgents(): Promise<Agent[]> {
    try {
      return await this.agentRepository.getEnableAgents();
    } catch (err) {
      throw new Exception(err);
    }
  }

  async getAgentById(agencyNumber: string): Promise<Agent> {
    try {
      const found = await this.agentRepository.findOne({ where: { agencyNumber } });
      if (!found) {
        return null;
      }

      return found;
    } catch (err) {
      throw new Exception(err);
    }
  }

  async createAgent(createAgentDto: CreateAgentDto): Promise<Agent> {
    let agencyNumber = createAgentDto.agencyNumber;
    const agentExistent = await this.agentRepository.findOne({ where: { agencyNumber } });
    if (agentExistent) throw new HttpException("El Agente ya existe.", 797);

    const agent = new Agent();
    agent.agencyNumber = agencyNumber;
    agent.orden = createAgentDto.orden;
    agent.zone = createAgentDto.zone;
    agent.mail = createAgentDto.mail;
    agent.active = true;
    return await this.agentRepository.createAgent(agent);
  }

  async updateAgent(updateAgentDto: UpdateAgentDto): Promise<Agent> {
    try {
      const { id, oldAgencyNumber, orden, zone, mail, active, newAgencyNumber } = updateAgentDto;

      let agencyNumber = updateAgentDto.oldAgencyNumber;

      let agent = await this.agentRepository.findOne({ where: { agencyNumber } });
      if (!agent) throw new NotFoundException(`User with userName "${agencyNumber}" not found`);

      agent.orden = orden;
      agent.zone = zone;
      agent.mail = mail;
      agent.active = true;
      if (newAgencyNumber) {
        agent.agencyNumber = newAgencyNumber;
      }
      console.log(agent);

      return await this.agentRepository.updateAgent(agent);
    } catch (err) {
      throw new Exception(err);
    }
  }

  async deleteAgent(agencyNumber: string): Promise<Agent> {
    try {
      const found = await this.agentRepository.findOne({ where: { agencyNumber } });
      if (!found) {
        throw new HttpException("No se encotnraron datos para el registro buscado.", 796);
      }

      return await this.agentRepository.deleteAgent(found.id);
    } catch (err) {
      throw new Exception(err);
    }
  }

  async editStateAgent(agencyNumber: string): Promise<Agent> {
    try {
      const found = await this.agentRepository.findOne({ where: { agencyNumber } });

      if (!found) {
        throw new HttpException("No se encotnraron registros requerido.", 796);
      }

      if (!found.active) {
        found.active = true;
      } else {
        found.active = false;
      }

      return await this.agentRepository.updateStateAgent(found);
    } catch (err) {
      throw new Exception(err);
    }
  }
}

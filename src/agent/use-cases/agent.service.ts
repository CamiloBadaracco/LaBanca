import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { agent } from 'supertest';
import { Agent } from '../domain/agent.entity';
import { CreateAgentDto } from '../infrastructure/controllers/dto/create-agent.dto';
import { UpdateAgentDto } from '../infrastructure/controllers/dto/update-agent.dto';
import { AgentRepository } from '../infrastructure/repository/agent.repository';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentRepository)
    private agentRepository: AgentRepository,
  ) {}

  async getAllAgents(): Promise<Agent[]> {
    return this.agentRepository.getAgents();
  }

  async getAgentById(agencyNumber: string): Promise<Agent> {
    const found = await this.agentRepository.findOne({ where: { agencyNumber } });

    if (!found) {
      throw new NotFoundException(`Agent with agencyNumber "${agencyNumber}" not found`);
    }

    return found;
  }
 

  async createAgent(createAgentDto: CreateAgentDto): Promise<Agent> {
    return await this.agentRepository.createAgent(createAgentDto);
  }

  
  async updateAgent(updateAgentDto: UpdateAgentDto): Promise<Agent> {
    return await this.agentRepository.updateAgent(updateAgentDto);
  }
  
  async deleteAgent(agencyNumber: string): Promise<Agent>{
    const found = await this.agentRepository.findOne({ where: { agencyNumber } });

    if (!found) {
      throw new NotFoundException(`Agent with agencyNumber "${agencyNumber}" not found`);
    }

     return await this.agentRepository.deleteAgent(found.id);
  }


   async editStateAgent(updateAgentDto: UpdateAgentDto): Promise<Agent>{
    
    const {id,agencyNumber,orden,zone,mail,active} = updateAgentDto;

    const found = await this.agentRepository.findOne({ where: { agencyNumber } });

    if (!found) {
      throw new NotFoundException(`Agent with agencyNumber "${agencyNumber}" not found`);
    } 

 

    if (!found.active) {
       updateAgentDto.active= true;
    }else{
       updateAgentDto.active= false;
    }
     
    updateAgentDto.id=found.id;

    return await this.agentRepository.updateStateAgent(updateAgentDto);
  }

  
}

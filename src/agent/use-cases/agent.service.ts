import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async getAgentById(id: number): Promise<Agent> {
    const found = await this.agentRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Agent with ID "${id}" not found`);
    }

    return found;
  }
 

  async createAgent(createAgentDto: CreateAgentDto): Promise<Agent> {
    return await this.agentRepository.createAgent(createAgentDto);
  }

  
  async updateAgent(updateAgentDto: UpdateAgentDto): Promise<Agent> {
    return await this.agentRepository.updateAgent(updateAgentDto);
  }
  
  async deleteAgent(id: number): Promise<Agent>{
     return await this.agentRepository.deleteAgent(id);
  }
}

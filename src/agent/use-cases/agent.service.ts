import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from '../domain/agent.entity';
import { CreateAgentDto } from '../infrastructure/controllers/dto/create-agent.dto';
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

  async getAgentByEmail(email: string): Promise<Agent> {
    const found = await this.agentRepository.findOne({ where: { email } });

    if (!found) {
      throw new NotFoundException(`Agent with email "${email}" not found`);
    }

    return found;
  }

  async createAgent(createAgentDto: CreateAgentDto): Promise<Agent> {
    return await this.agentRepository.createAgent(createAgentDto);
  }
}

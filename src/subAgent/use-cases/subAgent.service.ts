import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubAgent } from '../domain/subAgent.entity';
import { CreateSubAgenttDto } from '../infrastructure/controllers/dto/create-subAgent.dto';
import { SubAgentRepository } from '../infrastructure/repository/subAgent.respository';

@Injectable()
export class SubAgentService {
  constructor(
    @InjectRepository(SubAgentRepository)
    private agentRepository: SubAgentRepository,
  ) {}

  async getAllSubAgents(): Promise<SubAgent[]> {
    return this.agentRepository.getSubAgents();
  }

  async getSubAgentById(id: number): Promise<SubAgent> {
    const found = await this.agentRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`SubAgent with ID "${id}" not found`);
    }

    return found;
  }
 

  async createSubAgent(createSubAgentDto: CreateSubAgenttDto): Promise<SubAgent> {
    return await this.agentRepository.createSubAgent(createSubAgentDto);
  }
}

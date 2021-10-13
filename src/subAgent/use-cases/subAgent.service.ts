import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubAgent } from '../domain/subAgent.entity';
import { CreateSubAgenttDto } from '../infrastructure/controllers/dto/create-subAgent.dto';
import { UpdateSubAgentDto } from '../infrastructure/controllers/dto/update-subAgent.dto';
import { SubAgentRepository } from '../infrastructure/repository/subAgent.respository';

@Injectable()
export class SubAgentService {
  constructor(
    @InjectRepository(SubAgentRepository)
    private subAgentRepository: SubAgentRepository,
  ) {}

  async getAllSubAgents(): Promise<SubAgent[]> {
    return this.subAgentRepository.getSubAgents();
  }

  async getSubAgentById(id: number): Promise<SubAgent> {
    const found = await this.subAgentRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`SubAgent with ID "${id}" not found`);
    }

    return found;
  }
 

  async createSubAgent(createSubAgentDto: CreateSubAgenttDto): Promise<SubAgent> {
    return await this.subAgentRepository.createSubAgent(createSubAgentDto);
  }

  
  async updateSubAgent(updateSubAgentDto: UpdateSubAgentDto): Promise<SubAgent> {
    return await this.subAgentRepository.updateSubAgent(updateSubAgentDto);
  }
  
  async deleteSubAgent(id: number): Promise<SubAgent>{
     return await this.subAgentRepository.deleteSubAgent(id);
  }

  
  async updateStateSubAgent(id: number): Promise<SubAgent>{
    
    const found = await this.subAgentRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`SubAgent with ID "${id}" not found`);
    }

    var stateUpdating= false;
    if (found.active == false) {
      var stateUpdating= true;
    }

     
    var subAgentUpdate = new SubAgent();


    subAgentUpdate.id= found.id;
    subAgentUpdate.subAgencyNumber= found.subAgencyNumber;
    subAgentUpdate.documentNumber= found.documentNumber;
    subAgentUpdate.name= found.name;
    subAgentUpdate.passportPhoto= found.passportPhoto;
    subAgentUpdate.certificateGoodConduct= found.certificateGoodConduct;
    subAgentUpdate.dateOfUpdate= found.dateOfUpdate;
    subAgentUpdate.rut= found.rut;
    subAgentUpdate.literalE= found.literalE;
    subAgentUpdate.patentNumber= found.patentNumber;
    subAgentUpdate.certificateNumber= found.certificateNumber;
    subAgentUpdate.resolutionNumber= found.resolutionNumber;
    subAgentUpdate.active= stateUpdating;
  
 
      
    return await this.subAgentRepository.updateStateSubAgent(subAgentUpdate);
  }

}

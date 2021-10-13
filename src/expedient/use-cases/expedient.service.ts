import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expedient } from '../domain/expedient.entity';
import { CreateExpedientDto } from '../infrastructure/controllers/dto/create-expedient.dto';
import { UpdateExpedientDto } from '../infrastructure/controllers/dto/update-expedient.dto';
import { ExpedientRepository } from '../infrastructure/repository/expedient.respository';

@Injectable()
export class ExpedientService {
  constructor(
    @InjectRepository(ExpedientRepository)
    private expedientRepository: ExpedientRepository,
  ) {}

  async getAllExpedients(): Promise<Expedient[]> {
    return this.expedientRepository.getExpedients();
  }

  async getExpedientById(id: number): Promise<Expedient> {
    const found = await this.expedientRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Expedient with ID "${id}" not found`);
    }

    return found;
  }
 

  async createExpedient(createExpedientDto: CreateExpedientDto): Promise<Expedient> {
    return await this.expedientRepository.createExpedient(createExpedientDto);
  }
  
  async updateExpedient(updateExpedientsDto: UpdateExpedientDto): Promise<Expedient> {
    return await this.expedientRepository.updateExpedient(updateExpedientsDto);
  }
  
  async deleteExpedient(id: number): Promise<Expedient>{
     return await this.expedientRepository.deleteExpedient(id);
  }

  
  async updateStateExpedient(id: number): Promise<Expedient>{
    
    const found = await this.expedientRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Expedient with ID "${id}" not found`);
    }

    var stateUpdating= false;
    if (found.active == false) {
      var stateUpdating= true;
    }

     
    var expUpdate = new Expedient();
    expUpdate.expedientNumber = found.expedientNumber;
    expUpdate.url             =  found.url;
    expUpdate.observation     =  found.observation;
    expUpdate.active          =  stateUpdating;
 
      
    return await this.expedientRepository.updateStateExpedient(expUpdate);
  }
  
}

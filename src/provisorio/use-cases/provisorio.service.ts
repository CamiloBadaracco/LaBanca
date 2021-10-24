import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provisorio } from '../domain/provisorio.entity';
import { CreateProvisoriotDto } from '../infrastructure/controllers/dto/create-provisorio.dto';
import { UpdateProvisorioDto } from '../infrastructure/controllers/dto/update-provisorio.dto';
import { ProvisorioRepository } from '../infrastructure/repository/provisorio.respository';

@Injectable()
export class ProvisorioService {
  constructor(
    @InjectRepository(ProvisorioRepository)
    private provisorioRepository: ProvisorioRepository,
  ) {}

  async getAllProvisorios(): Promise<Provisorio[]> {
    return this.provisorioRepository.getProvisorios();
  }

  async getProvisorioById(id: number): Promise<Provisorio> {
    const found = await this.provisorioRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Provisorio with ID "${id}" not found`);
    }

    return found;
  }
 

  async createProvisorio(createProvisorioDto: CreateProvisoriotDto): Promise<Provisorio> {
    return await this.provisorioRepository.createProvisorio(createProvisorioDto);
  }

  
  
  async updateProvisorio(updateProvisorioDto: UpdateProvisorioDto): Promise<Provisorio> {
    return await this.provisorioRepository.updateProvisorio(updateProvisorioDto);
  }
  
  async deleteProvisorio(id: number): Promise<Provisorio>{
     return await this.provisorioRepository.deleteProvisorio(id);
  }

  
  
  async updateStateProvisorio(id: number): Promise<Provisorio>{
    
    const found = await this.provisorioRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Provisorio with ID "${id}" not found`);
    }

    var stateUpdating= false;
    if (found.active == false) {
      var stateUpdating= true;
    }

     
    var provUpdate = new Provisorio();
    provUpdate.id              = found.id;
    provUpdate.url             =  found.url;
    provUpdate.observation     =  found.observation;
    provUpdate.active          =  stateUpdating;
    provUpdate.dateOfUpdated   = found.dateOfUpdated;
 
      
    return await this.provisorioRepository.updateStateProvisorio(provUpdate);
  }
  


}

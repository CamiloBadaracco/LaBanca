import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provisorio } from '../domain/provisorio.entity';
import { CreateProvisoriotDto } from '../infrastructure/controllers/dto/create-provisorio.dto';
import { ProvisorioRepository } from '../infrastructure/repository/provisorio.respository';

@Injectable()
export class ProvisorioService {
  constructor(
    @InjectRepository(ProvisorioRepository)
    private agentRepository: ProvisorioRepository,
  ) {}

  async getAllProvisorios(): Promise<Provisorio[]> {
    return this.agentRepository.getProvisorios();
  }

  async getProvisorioById(id: number): Promise<Provisorio> {
    const found = await this.agentRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Provisorio with ID "${id}" not found`);
    }

    return found;
  }
 

  async createProvisorio(createProvisorioDto: CreateProvisoriotDto): Promise<Provisorio> {
    return await this.agentRepository.createProvisorio(createProvisorioDto);
  }
}

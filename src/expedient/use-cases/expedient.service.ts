import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubAgent } from 'src/subAgent/domain/subAgent.entity';
import { CreateSubAgenttDto } from 'src/subAgent/infrastructure/controllers/dto/create-subAgent.dto';
import { Expedient } from '../domain/expedient.entity';
import { CreateExpedientDto } from '../infrastructure/controllers/dto/create-expedient.dto';
import { UpdateExpedientDto } from '../infrastructure/controllers/dto/update-expedient.dto';
import { ExpedientRepository } from '../infrastructure/repository/expedient.respository';
import { SubAgentService } from 'src/subAgent/use-cases/subAgent.service';

@Injectable()
export class ExpedientService {
  constructor(@InjectRepository(ExpedientRepository)private expedientRepository: ExpedientRepository, private subAgentService: SubAgentService ) {}
  
 

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
 

  async createExpedient(createExpedientDto: CreateExpedientDto): Promise<SubAgent> {
    
    
    //NumeroSubAgency
    let subAgencyNumber = createExpedientDto.subAgencyNumber;
    console.log('SubAgency recibido: '+ subAgencyNumber);

    //Obtengo SubAgente por numero de sub agente y me quedo con la address viva.
    let subagent =  await this.subAgentService.getSubAgentBySubAgencyNumber(subAgencyNumber);

   
    
    
    //Si hay provisorio vivo, hago update para cambiar de estado
    if (subagent.provisorio.length > 0 ) 
    {
      subagent.expedient.filter(exp => exp.active == true ).forEach(exp => {
        exp.active = false;  
      
        this.expedientRepository.updateStateExpedient(exp);
      });
    }
    
    
    const objExpedient = new Expedient();
    objExpedient.expedientNumber = createExpedientDto.expedientNumber;
    objExpedient.active = true;
    objExpedient.url= createExpedientDto.url;
    objExpedient.observation = createExpedientDto.observation;
    //objExpedient.subAgent.subAgencyNumber =createProvisorioDto.subAgencyNumber;
    
    
    const createSubAgentDto= new  CreateSubAgenttDto();
 
    createSubAgentDto.subAgencyNumber = subagent.subAgencyNumber;
    createSubAgentDto.documentNumber = subagent.documentNumber;
    createSubAgentDto.name = subagent.name;
    createSubAgentDto.passportPhoto = subagent.passportPhoto;
    createSubAgentDto.certificateGoodConduct = subagent.certificateGoodConduct;
    createSubAgentDto.rut = subagent.rut;
    createSubAgentDto.literalE = subagent.literalE;
    createSubAgentDto.patentNumber = subagent.patentNumber;
    createSubAgentDto.certificateNumber = subagent.certificateNumber;
    createSubAgentDto.address =  subagent.address[0];
    createSubAgentDto.expedient =objExpedient;
    createSubAgentDto.provisorio =  subagent.provisorio[0];
 
    let subAgentResul = null;
     //Creo nuevo subAgentConAddress
      subAgentResul = await this.subAgentService.createSubAgent(createSubAgentDto);
      return subagent;
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

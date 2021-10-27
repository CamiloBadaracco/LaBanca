import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provisorio } from '../domain/provisorio.entity';
import { CreateProvisoriotDto } from '../infrastructure/controllers/dto/create-provisorio.dto';
import { UpdateProvisorioDto } from '../infrastructure/controllers/dto/update-provisorio.dto';
import { ProvisorioRepository } from '../infrastructure/repository/provisorio.respository';
import { SubAgentService } from 'src/subAgent/use-cases/subAgent.service';
import { CreateSubAgenttDto } from 'src/subAgent/infrastructure/controllers/dto/create-subAgent.dto';
import { SubAgent } from 'src/subAgent/domain/subAgent.entity';


@Injectable()
export class ProvisorioService {
  constructor(@InjectRepository(ProvisorioRepository)private provisorioRepository: ProvisorioRepository, private subAgentService: SubAgentService ) {}

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
 

  async createProvisorio(createProvisorioDto: CreateProvisoriotDto): Promise<SubAgent> {
    
    
    //NumeroSubAgency
    let subAgencyNumber = createProvisorioDto.subAgencyNumber;
    console.log('SubAgency recibido: '+ subAgencyNumber);

    //Obtengo SubAgente por numero de sub agente y me quedo con la address viva.
    let subagent =  await this.subAgentService.getSubAgentBySubAgencyNumber(subAgencyNumber);

   
    
    //Si hay provisorio vivo, hago update para cambiar de estado
    if (subagent.provisorio.length > 0 ) 
    {
      subagent.provisorio.filter(prov => prov.active == true ).forEach(prov => {
        prov.active = false;  
      
        this.provisorioRepository.updateStateProvisorio(prov);
      });
    }
 

    
    const objProv = new Provisorio();
    objProv.id = 0;
    objProv.active = true;
    objProv.url= createProvisorioDto.url;
    objProv.observation = createProvisorioDto.observation;
    //objProv.subAgent.subAgencyNumber =createProvisorioDto.subAgencyNumber;
    
    
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
    createSubAgentDto.expedient =  subagent.expedient[0];
    createSubAgentDto.provisorio =  objProv;
 
    let subAgentResul = null;
     //Creo nuevo subAgentConAddress
      subAgentResul = await this.subAgentService.createSubAgent(createSubAgentDto);
      return subagent;

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

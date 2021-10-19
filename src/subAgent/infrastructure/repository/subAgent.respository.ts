import { EntityRepository, Repository } from 'typeorm';
import { CreateSubAgenttDto } from '../controllers/dto/create-subAgent.dto';
import { SubAgent } from '../../domain/subAgent.entity';
import { UpdateSubAgentDto } from '../controllers/dto/update-subAgent.dto';
import { Address } from 'src/address/domain/address.entity';

@EntityRepository(SubAgent)
export class SubAgentRepository extends Repository<SubAgent> {
  async getSubAgents(): Promise<SubAgent[]> {
    const query = this.createQueryBuilder('subAgent');

    const agents = await query.getMany();
    return agents;
  }



  async getSubAgentById(): Promise<SubAgent[]> {
    const query = this.createQueryBuilder('subAgent')
      .leftJoinAndSelect('subAgent.address', 'address')

    const agents = await query.getMany();
    return agents;
  }


 
 

  async createSubAgent(createSubAgentDto: CreateSubAgenttDto): Promise<SubAgent> {
    const { subAgencyNumber,documentNumber, name,passportPhoto,certificateGoodConduct,rut,literalE,patentNumber,certificateNumber,resolutionNumber,address,expedient,provisorio} = createSubAgentDto;

    const subAgent = new SubAgent();

    subAgent.subAgencyNumber = subAgencyNumber;
    subAgent.documentNumber = documentNumber;
    subAgent.name = name;
    subAgent.passportPhoto = passportPhoto;
    subAgent.certificateGoodConduct = certificateGoodConduct;
    subAgent.dateOfUpdate = null;
    subAgent.rut = rut;
    subAgent.literalE = literalE;
    subAgent.patentNumber = patentNumber;
    subAgent.certificateNumber = certificateNumber;
    subAgent.resolutionNumber = resolutionNumber;
    subAgent.active =true;

 

 
    const objAdd = new Address();
    objAdd.id = address.id;
    objAdd.location = address.location;
    objAdd.department= address.department;
    objAdd.active = true;
    objAdd.streetName =address.streetName;
    objAdd.streetNumber = address.streetNumber;
    objAdd.apto=address.apto;
    objAdd.observation = address.observation;
     
 
    var addressAgregar = new Array<Address>();
    addressAgregar.push(objAdd);  
    subAgent.address=addressAgregar;

    
    subAgent.expedients=null;
    subAgent.provisorios=null;
 

    await subAgent.save();
    return subAgent;
  }


  
  async updateSubAgent(createSubAgentDto: UpdateSubAgentDto): Promise<SubAgent> {
    const { subAgencyNumber,documentNumber, name,passportPhoto,certificateGoodConduct,rut,literalE,patentNumber,certificateNumber,resolutionNumber} = createSubAgentDto;

    const subAgent = new SubAgent();
    subAgent.subAgencyNumber = subAgencyNumber;
    subAgent.documentNumber = documentNumber;
    subAgent.name = name;
    subAgent.passportPhoto = passportPhoto;
    subAgent.certificateGoodConduct = certificateGoodConduct;
    subAgent.rut = rut;
    subAgent.literalE = literalE;
    subAgent.patentNumber = patentNumber;
    subAgent.certificateNumber = certificateNumber;
    subAgent.resolutionNumber = resolutionNumber;
 

    await subAgent.save();
    return subAgent;
  }

  
  async deleteSubAgent(id: number ) : Promise<SubAgent> {
    const subAgent = new SubAgent();
      await this.delete(id);
      return subAgent;
  }



  
  
  async updateStateSubAgent(subAgentUpdt:SubAgent ) : Promise<SubAgent> {
    const { id,subAgencyNumber,documentNumber,name,passportPhoto,certificateGoodConduct,dateOfUpdate,rut,literalE,patentNumber,certificateNumber,resolutionNumber,active} = subAgentUpdt;


    const subAg = new SubAgent();
    
    subAg.id= id;
    subAg.subAgencyNumber= subAgencyNumber;
    subAg.documentNumber= documentNumber;
    subAg.name= name;
    subAg.passportPhoto= passportPhoto;
    subAg.certificateGoodConduct= certificateGoodConduct;
    subAg.dateOfUpdate= dateOfUpdate;
    subAg.rut= rut;
    subAg.literalE= literalE;
    subAg.patentNumber= patentNumber;
    subAg.certificateNumber= certificateNumber;
    subAg.resolutionNumber= resolutionNumber;
    subAg.active= active;
 
    await subAg.save();
    return subAg;
  }
}

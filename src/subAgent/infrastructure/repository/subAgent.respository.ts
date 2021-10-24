import { EntityRepository, Repository } from 'typeorm';
import { CreateSubAgenttDto } from '../controllers/dto/create-subAgent.dto';
import { SubAgent } from '../../domain/subAgent.entity';
import { UpdateSubAgentDto } from '../controllers/dto/update-subAgent.dto';
import { Address } from 'src/address/domain/address.entity';
import { Expedient } from 'src/expedient/domain/expedient.entity';
import { Provisorio } from 'src/provisorio/domain/provisorio.entity';

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


 
 

  async createSubAgent(idParam:number, createSubAgentDto: CreateSubAgenttDto): Promise<SubAgent> {
    const { subAgencyNumber,documentNumber, name, documentIdPhoto, formNineHundred, passportPhoto,certificateGoodConduct,rut,literalE,patentNumber,certificateNumber,enabledDocument,cesantiaDocument,changeAddressDocument,address,expedient,provisorio} = createSubAgentDto;

    const subAgent = new SubAgent();


     
    subAgent.id= idParam;
    subAgent.subAgencyNumber = subAgencyNumber;
    subAgent.documentNumber = documentNumber;
    subAgent.name = name;
    subAgent.documentIdPhoto=documentIdPhoto;
    subAgent.formNineHundred=formNineHundred;
    subAgent.passportPhoto = passportPhoto;
    subAgent.certificateGoodConduct = certificateGoodConduct;
    
  
    
    subAgent.rut = rut;
    subAgent.literalE = literalE;
    subAgent.patentNumber = patentNumber;
    subAgent.certificateNumber = certificateNumber;


    subAgent.enabledDocument = enabledDocument;
    subAgent.cesantiaDocument = cesantiaDocument;
    subAgent.changeAddressDocument = changeAddressDocument;
      
    subAgent.active =true;

 
 
    var addressAgregar = new Array<Address>();
    addressAgregar.push(address);  
    subAgent.address=addressAgregar;

    
    var expedientAgregar = new Array<Expedient>();
    expedientAgregar.push(expedient);  
    subAgent.expedient=expedientAgregar;

  
    
    var provisorioAgregar = new Array<Provisorio>();
    provisorioAgregar.push(provisorio);  
    subAgent.provisorio=provisorioAgregar;



    await subAgent.save();
    return subAgent;
  }


  
  async updateSubAgent(createSubAgentDto: UpdateSubAgentDto): Promise<SubAgent> {
    const { subAgencyNumber,documentNumber, name,documentIdPhoto,formNineHundred,passportPhoto,certificateGoodConduct,rut,literalE,patentNumber,certificateNumber,enabledDocument,cesantiaDocument,changeAddressDocument} = createSubAgentDto;

    const subAgent = new SubAgent();
    subAgent.subAgencyNumber = subAgencyNumber;
    subAgent.documentNumber = documentNumber;
    subAgent.name = name;
    subAgent.documentIdPhoto=documentIdPhoto;
    subAgent.formNineHundred=formNineHundred;
    subAgent.passportPhoto = passportPhoto;
    subAgent.certificateGoodConduct = certificateGoodConduct;
    subAgent.rut = rut;
    subAgent.literalE = literalE;
    subAgent.patentNumber = patentNumber;
    subAgent.certificateNumber = certificateNumber;
 
    subAgent.enabledDocument = enabledDocument;
    subAgent.cesantiaDocument = cesantiaDocument;
    subAgent.changeAddressDocument = changeAddressDocument;
     

    await subAgent.save();
    return subAgent;
  }

  
  async deleteSubAgent(id: number ) : Promise<SubAgent> {
    const subAgent = new SubAgent();
      await this.delete(id);
      return subAgent;
  }



  
  
  async updateStateSubAgent(subAgentUpdt:SubAgent ) : Promise<SubAgent> {
      const { id,subAgencyNumber,documentNumber,name,documentIdPhoto,formNineHundred,passportPhoto,certificateGoodConduct,dateOfUpdate,rut,literalE,patentNumber,certificateNumber,enabledDocument,cesantiaDocument,changeAddressDocument,active} = subAgentUpdt;


      const subAg = new SubAgent();
      
      subAg.id= id;
      subAg.subAgencyNumber= subAgencyNumber;
      subAg.documentNumber= documentNumber;
      subAg.name= name;
      subAg.documentIdPhoto=documentIdPhoto; 
      subAg.formNineHundred=formNineHundred; 
      subAg.passportPhoto= passportPhoto;
      subAg.certificateGoodConduct= certificateGoodConduct;
      subAg.dateOfUpdate= dateOfUpdate;
      subAg.rut= rut;
      subAg.literalE= literalE;
      subAg.patentNumber= patentNumber;
      subAg.certificateNumber= certificateNumber;
      subAg.enabledDocument = enabledDocument;
      subAg.cesantiaDocument = cesantiaDocument;
      subAg.changeAddressDocument = changeAddressDocument;
      
      subAg.active= active;
  
      await subAg.save();
    return subAg;
  }
}

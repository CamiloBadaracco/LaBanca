import { EntityRepository, Repository } from 'typeorm';
import { CreateProvisoriotDto } from '../controllers/dto/create-provisorio.dto';
import { Provisorio } from '../../domain/provisorio.entity';
import { UpdateProvisorioDto } from '../controllers/dto/update-provisorio.dto';

@EntityRepository(Provisorio)
export class ProvisorioRepository extends Repository<Provisorio> {
  async getProvisorios(): Promise<Provisorio[]> {
    const query = this.createQueryBuilder('provisorio');

    const agents = await query.getMany();
    return agents;
  }

  async createProvisorio(createProvisorioDto: CreateProvisoriotDto): Promise<Provisorio> {
    const { url,observation,active } = createProvisorioDto;

    const provisorio = new Provisorio();
    provisorio.url = url;
    provisorio.observation = observation;
    provisorio.active = active;
  
    await provisorio.save();
    return provisorio;
  }

  
  async updateProvisorio(updateProvisorioDto: UpdateProvisorioDto): Promise<Provisorio> {
    const { id,url,observation,active } = updateProvisorioDto;

    const provisorio = new Provisorio();
    provisorio.id = parseInt(id.toString());
    provisorio.url = url;
    provisorio.observation = observation;
    provisorio.active = active;
  
    await provisorio.save();
    return provisorio;
  }

  
  
  async deleteProvisorio(id: number ) : Promise<Provisorio> {
    const provisorio = new Provisorio();
      await this.delete(id);
      return provisorio;
  }

  
  async updateStateProvisorio(provisorioUpdt:Provisorio ) : Promise<Provisorio> {
    const { id, url, observation, active  } = provisorioUpdt;

    const prov = new Provisorio();
    prov.id = id;
    prov.url = url;
    prov.observation = observation;
    prov.active = active;
    
    await prov.save();
    return prov;
  }

}

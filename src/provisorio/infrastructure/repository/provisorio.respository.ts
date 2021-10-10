import { EntityRepository, Repository } from 'typeorm';
import { CreateProvisoriotDto } from '../controllers/dto/create-provisorio.dto';
import { Provisorio } from '../../domain/provisorio.entity';

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
}

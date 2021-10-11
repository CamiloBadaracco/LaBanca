import { EntityRepository, Repository } from 'typeorm';
import { CreateExpedientDto } from '../controllers/dto/create-expedient.dto';
import { Expedient } from '../../domain/expedient.entity';

@EntityRepository(Expedient)
export class ExpedientRepository extends Repository<Expedient> {
  async getExpedients(): Promise<Expedient[]> {
    const query = this.createQueryBuilder('expedient');

    const agents = await query.getMany();
    return agents;
  }

  async createExpedient(createExpedientDto: CreateExpedientDto): Promise<Expedient> {
    const {expedientNumber,url,observation,active } = createExpedientDto;

    const expedient = new Expedient();
    expedient.expedientNumber = expedientNumber;
    expedient.url = url;
    expedient.observation = observation;
    expedient.active = active;
  
    await expedient.save();
    return expedient;
  }
}

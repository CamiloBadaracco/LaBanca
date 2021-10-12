import { EntityRepository, Repository } from 'typeorm';
import { CreateExpedientDto } from '../controllers/dto/create-expedient.dto';
import { Expedient } from '../../domain/expedient.entity';
import { UpdateExpedientDto } from '../controllers/dto/update-expedient.dto';

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

  
  async updateExpedient(updateExpedientDto: UpdateExpedientDto): Promise<Expedient> {
    const {expedientNumber,url,observation,active } = updateExpedientDto;

    const expedient = new Expedient();
    expedient.expedientNumber = expedientNumber;
    expedient.url = url;
    expedient.observation = observation;
    expedient.active = active;
  
    await expedient.save();
    return expedient;
  }

  
  
  async deleteExpedient(id: number ) : Promise<Expedient> {
    const expedient = new Expedient();
      await this.delete(id);
      return expedient;
  }
}

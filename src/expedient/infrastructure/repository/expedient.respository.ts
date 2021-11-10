import { EntityRepository, Repository } from "typeorm";
import { CreateExpedientDto } from "../controllers/dto/create-expedient.dto";
import { Expedient } from "../../domain/expedient.entity";
import { UpdateExpedientDto } from "../controllers/dto/update-expedient.dto";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";

@EntityRepository(Expedient)
export class ExpedientRepository extends Repository<Expedient> {
  async getExpedients(): Promise<Expedient[]> {
    const query = this.createQueryBuilder("expedient").leftJoinAndSelect("expedient.subAgent", "subAgent");

    const agents = await query.getMany();
    return agents;
  }
  /* -- se da de alta por medio de sub agent no se utiliza
  async createExpedient(createExpedientDto: CreateExpedientDto): Promise<SubAgent> {
    const {expedientNumber,url,observation,active } = createExpedientDto;

    const expedient = new Expedient();
    expedient.expedientNumber = expedientNumber;
    expedient.url = url;
    expedient.observation = observation;
    expedient.active = active;
   
    await expedient.save();
    return expedient;
 
  }*/

  async updateExpedient(updateExpedientDto: UpdateExpedientDto): Promise<Expedient> {
    const { expedientNumber, url, observation, active } = updateExpedientDto;

    const expedient = new Expedient();
    expedient.expedientNumber = parseInt(expedientNumber.toString());
    expedient.url = url;
    expedient.observation = observation;
    expedient.active = active;

    await expedient.save();
    return expedient;
  }

  async deleteExpedient(id: number): Promise<Expedient> {
    const expedient = new Expedient();
    await this.delete(id);
    return expedient;
  }

  async updateStateExpedient(expedientUpdt: Expedient): Promise<Expedient> {
    const { expedientNumber, url, observation, active } = expedientUpdt;

    const exped = new Expedient();
    exped.expedientNumber = expedientNumber;
    exped.url = url;
    exped.observation = observation;
    exped.active = active;

    await exped.save();
    return exped;
  }
}

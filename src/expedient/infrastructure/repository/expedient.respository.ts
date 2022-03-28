import { EntityRepository, Repository } from "typeorm";
import { Expedient } from "../../domain/expedient.entity";

@EntityRepository(Expedient)
export class ExpedientRepository extends Repository<Expedient> {
  async getExpedients(): Promise<Expedient[]> {
    const query = this.createQueryBuilder("expedient").leftJoinAndSelect("expedient.subAgent", "subAgent");

    const agents = await query.getMany();
    return agents;
  }

  async getEnableExpedient(): Promise<Expedient[]> {
    const query = this.createQueryBuilder("expedient").leftJoinAndSelect("expedient.subAgent", "subAgent").where("expedient.active = true");

    const agents = await query.getMany();
    return agents;
  }

  async updateExpedient(expedient: Expedient): Promise<Expedient> {
    await expedient.save();
    return expedient;
  }

  async deleteExpedient(id: number): Promise<Expedient> {
    const expedient = new Expedient();
    await this.delete(id);
    return expedient;
  }

  async updateStateExpedient(expedientUpdt: Expedient): Promise<Expedient> {
    try {
      await expedientUpdt.save();
      return expedientUpdt;
    } catch {
      console.log("Error");
    }
  }
}

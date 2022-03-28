import { EntityRepository, Repository } from "typeorm";
import { CreateProvisoriotDto } from "../controllers/dto/create-provisorio.dto";
import { Provisorio } from "../../domain/provisorio.entity";
import { UpdateProvisorioDto } from "../controllers/dto/update-provisorio.dto";

@EntityRepository(Provisorio)
export class ProvisorioRepository extends Repository<Provisorio> {
  async getProvisorios(): Promise<Provisorio[]> {
    const query = this.createQueryBuilder("provisorio").leftJoinAndSelect("provisorio.subAgent", "subAgent");

    const agents = await query.getMany();
    return agents;
  }

  async getEnabledProvisorio(): Promise<Provisorio[]> {
    const query = this.createQueryBuilder("provisorio").leftJoinAndSelect("provisorio.subAgent", "subAgent").where("provisorio.active = true");

    const agents = await query.getMany();
    return agents;
  }

  async createProvisorio(createProvisorioDto: CreateProvisoriotDto): Promise<Provisorio> {
    const { url, observation, active } = createProvisorioDto;

    const provisorio = new Provisorio();
    provisorio.url = " fija REPOSITORY LIN 19";
    provisorio.observation = observation;
    provisorio.active = active;
    provisorio.dateOfUpdated = new Date();

    await provisorio.save();
    return provisorio;
  }

  async updateProvisorio(updateProvisorioDto: UpdateProvisorioDto): Promise<Provisorio> {
    const { id, url, observation, active } = updateProvisorioDto;

    const provisorio = new Provisorio();
    provisorio.id = parseInt(id.toString());
    provisorio.url = null;
    provisorio.observation = observation;
    provisorio.active = active;
    //provisorio.dateOfUpdated =dateOfUpdated;

    await provisorio.save();
    return provisorio;
  }

  async deleteProvisorio(id: number): Promise<Provisorio> {
    const provisorio = new Provisorio();
    await this.delete(id);
    return provisorio;
  }

  async updateStateProvisorio(provisorioUpdt: Provisorio): Promise<Provisorio> {
    /*  const { id, url, observation, active, dateOfUpdated } = provisorioUpdt;

    const prov = new Provisorio();
    prov.id = id;
    prov.url = url;
    prov.observation = observation;
    prov.active = active;
    prov.dateOfUpdated = dateOfUpdated;
*/

    await provisorioUpdt.save();
    return provisorioUpdt;
  }
}

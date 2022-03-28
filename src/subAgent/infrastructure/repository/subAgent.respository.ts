import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { EntityRepository, Repository } from "typeorm";
import { SubAgent } from "../../domain/subAgent.entity";

@EntityRepository(SubAgent)
export class SubAgentRepository extends Repository<SubAgent> {
  async getSubAgents(): Promise<SubAgent[]> {
    const query = this.createQueryBuilder("subAgent").leftJoinAndSelect("subAgent.address", "address").leftJoinAndSelect("subAgent.expedient", "expedient").leftJoinAndSelect("subAgent.provisorio", "provisorio").leftJoinAndSelect("subAgent.agent", "agent").where("address.active = true").andWhere("expedient.active = true").andWhere("provisorio.active = true");

    const agents = await query.getMany();
    return agents;
  }

  async getEnableSubAgents(): Promise<SubAgent[]> {
    const query = this.createQueryBuilder("subAgent").leftJoinAndSelect("subAgent.address", "address").leftJoinAndSelect("subAgent.expedient", "expedient").leftJoinAndSelect("subAgent.provisorio", "provisorio").leftJoinAndSelect("subAgent.agent", "agent").where("address.active = true").andWhere("expedient.active = true").andWhere("provisorio.active = true").andWhere("subAgent.active = true");

    const agents = await query.getMany();
    return agents;
  }

  async getSubAgentById(): Promise<SubAgent[]> {
    const query = this.createQueryBuilder("subAgent").leftJoinAndSelect("subAgent.address", "address");

    const agents = await query.getMany();
    return agents;
  }

  async createSubAgent(objSubAgent: SubAgent): Promise<SubAgent> {
    try {
      await objSubAgent.save();
      return objSubAgent;
    } catch (err) {
      throw new BadRequestException("Al crear subAgent Respository" + err);
    }
  }

  async updateSubAgent(subAgent: SubAgent): Promise<SubAgent> {
    await subAgent.save();
    return subAgent;
  }

  async updateSubAgentAux(createSubAgent: SubAgent): Promise<SubAgent> {
    await createSubAgent.save();
    return createSubAgent;
  }

  async deleteSubAgent(id: number): Promise<SubAgent> {
    const subAgent = new SubAgent();
    await this.delete(id);
    return subAgent;
  }

  async updateStateSubAgent(subAgentUpdt: SubAgent): Promise<SubAgent> {
    const { id, subAgencyNumber, documentNumber, name, documentIdPhoto, formNineHundred, passportPhoto, certificateGoodConduct, dateOfUpdate, rut, documentDGI, literalE, patentNumber, certificateNumber, enabledDocument, cesantiaDocument, changeAddressDocument, active } = subAgentUpdt;

    await subAgentUpdt.save();
    return subAgentUpdt;
  }
}

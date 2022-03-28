import { Console } from "console";
import { UserAgent } from "src/userAgent/domain/userAgent.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserAgent)
export class UserAgentRepository extends Repository<UserAgent> {
  async getAllUserAgents(): Promise<UserAgent[]> {
    const query = this.createQueryBuilder("userAgent").leftJoinAndSelect("userAgent.agent", "agent");
    const agents = await query.getMany();
    return agents;
  }

  async getEnableUserAgents(): Promise<UserAgent[]> {
    const query = this.createQueryBuilder("userAgent").leftJoinAndSelect("userAgent.agent", "agent").where("userAgent.active = true");
    const userAgent = await await query.getMany();
    return userAgent;
  }

  async getUserAgentByAgencyNumber(agencyNumberParam: string): Promise<UserAgent[]> {
    const query = this.createQueryBuilder("userAgent").where("userAgent.agencyNumber = :agencyNumber", { agencyNumber: Number(agencyNumberParam) });
    const userAgent = await await query.getMany();
    return userAgent;
  }

  async createUserAgent(userAgent: UserAgent): Promise<UserAgent> {
    console.log("------------- Serv User Agent ------ -----------------/*/**/*/");
    console.log(userAgent);
    console.log("------------------------------------------------/*/**/*/");
    return userAgent.save();
  }

  async updateUserAgent(userAgent: UserAgent): Promise<UserAgent> {
    console.log("UPDATE");

    await userAgent.save();
    return userAgent;
  }

  async deleteUserAgent(id: number): Promise<UserAgent> {
    const userAgent = new UserAgent();
    await this.delete(id);
    return userAgent;
  }

  async updateStateUserAgent(userAgent: UserAgent): Promise<UserAgent> {
    await userAgent.save();
    return userAgent;
  }
}

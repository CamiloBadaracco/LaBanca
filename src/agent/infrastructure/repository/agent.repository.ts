import { EntityRepository, Repository } from "typeorm";
import { Agent } from "../../domain/agent.entity";

@EntityRepository(Agent)
export class AgentRepository extends Repository<Agent> {
  async getAgents(): Promise<Agent[]> {
    const query = this.createQueryBuilder("agent");
    const agents = await query.getMany();
    return agents;
  }

  async getEnableAgents(): Promise<Agent[]> {
    const query = this.createQueryBuilder("agent").where("agent.active = true");
    const agents = await query.getMany();
    return agents;
  }

  async createAgent(agent: Agent): Promise<Agent> {
    await agent.save();
    return agent;
  }

  async updateAgent(agent: Agent): Promise<Agent> {
    await agent.save();
    return agent;
  }

  async deleteAgent(id: number): Promise<Agent> {
    const agent = new Agent();
    await this.delete(id);
    return agent;
  }

  async updateStateAgent(agent: Agent): Promise<Agent> {
    await agent.save();
    return agent;
  }
}

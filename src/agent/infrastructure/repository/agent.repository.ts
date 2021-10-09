import { EntityRepository, Repository } from 'typeorm';
import { CreateAgentDto } from '../controllers/dto/create-agent.dto';
import { Agent } from '../../domain/agent.entity';

@EntityRepository(Agent)
export class AgentRepository extends Repository<Agent> {
  async getAgents(): Promise<Agent[]> {
    const query = this.createQueryBuilder('agent');

    const agents = await query.getMany();
    return agents;
  }

  async createAgent(createAgentDto: CreateAgentDto): Promise<Agent> {
    const { agencyNumber, orden, zone, mail, active } = createAgentDto;

    const agent = new Agent();
    agent.agencyNumber = agencyNumber;
    agent.orden = orden;
    agent.zone = zone;
    agent.mail = mail;
    agent.active = active;
    await agent.save();
    return agent;
  }
}

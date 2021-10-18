import { EntityRepository, Repository } from 'typeorm';
import { CreateAgentDto } from '../controllers/dto/create-agent.dto';
import { Agent } from '../../domain/agent.entity';
import { UpdateAgentDto } from '../controllers/dto/update-agent.dto';

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

  
  async updateAgent(updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const { id,agencyNumber, orden, zone, mail, active } = updateAgentDto;

    const agent = new Agent();
    agent.id = id;
    agent.agencyNumber = agencyNumber;
    agent.orden = orden;
    agent.zone = zone;
    agent.mail = mail;
    agent.active = active;
    await agent.save();
    return agent;
  }

  
  async deleteAgent(id: number ) : Promise<Agent> {
    const agent = new Agent();
      await this.delete(id);
      return agent;
  }

  async updateStateAgent(agentUpdt:UpdateAgentDto ) : Promise<Agent> {
    const { id,agencyNumber, orden, zone, mail, active  } = agentUpdt;

    const agent = new Agent();
    agent.id = parseInt(id.toString());
    agent.agencyNumber = agencyNumber.toString();
    agent.orden = orden;
    agent.zone = zone;
    agent.mail = mail;
    agent.mail = mail;
    agent.active = active;
    
    await agent.save();
    return agent;
  }
 
}

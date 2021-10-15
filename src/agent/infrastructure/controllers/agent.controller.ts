import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent } from '../../domain/agent.entity';
import { AgentService } from '../../use-cases/agent.service';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Controller('agent')
export class AgentController {
  constructor(private agentsService: AgentService) {}

  @Get()
  getAgents(): Promise<Agent[]> {
    return this.agentsService.getAllAgents();
  }

  @Get('/:agencyNumber')
  getAgentById(@Param('agencyNumber') agencyNumber: string): Promise<Agent> {
    return this.agentsService.getAgentById(agencyNumber);
  }

  @Post()
  createAgent(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentsService.createAgent(createAgentDto);
  }

  
  @Put()
  updateAgent(@Body() updateAgentDto: UpdateAgentDto): Promise<Agent> {
    return this.agentsService.updateAgent(updateAgentDto);
  }

  @Delete('/:agencyNumber')
  deleteAgent(@Param('agencyNumber') agencyNumber: string):Promise<Agent>{
    return this.agentsService.deleteAgent(agencyNumber);
  }

  @Patch('/state/:id')
  updateStateAgent(@Param('id') id: number) {
  this.agentsService.updateStateAgent(id);
  }
 
}

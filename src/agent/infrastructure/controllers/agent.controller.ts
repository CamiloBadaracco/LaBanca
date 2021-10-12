import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Get('/:id')
  getAgentById(@Param('id') id: number): Promise<Agent> {
    return this.agentsService.getAgentById(id);
  }

  @Post()
  createAgent(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentsService.createAgent(createAgentDto);
  }

  
  @Put()
  updateAgent(@Body() updateAgentDto: UpdateAgentDto): Promise<Agent> {
    return this.agentsService.updateAgent(updateAgentDto);
  }

  @Delete()
  deleteAgent(@Param('id') id: number):Promise<Agent>{
    return this.agentsService.deleteAgent(id);
  }
}

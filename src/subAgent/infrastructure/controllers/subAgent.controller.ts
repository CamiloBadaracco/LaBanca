import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  import { CreateSubAgenttDto } from './dto/create-subAgent.dto';
  import { SubAgent } from '../../domain/subAgent.entity';
  import { SubAgentService } from '../../use-cases/subAgent.service';
  
  @Controller('subAgent')
  export class SubAgentController {
    constructor(private subAgentService: SubAgentService) {}
  
    @Get()
    getSubAgents(): Promise<SubAgent[]> {
      return this.subAgentService.getAllSubAgents();
    }
  
    @Get('/:id')
    getSubAgentById(@Param('id') id: number): Promise<SubAgent> {
      return this.subAgentService.getSubAgentById(id);
    }
  
    @Post()
    createSubAgent(@Body() createSubAgentDto: CreateSubAgenttDto): Promise<SubAgent> {
      return this.subAgentService.createSubAgent(createSubAgentDto);
    }
  }
  
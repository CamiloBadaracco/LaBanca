import {Body,Controller,Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
  import { CreateSubAgenttDto } from './dto/create-subAgent.dto';
  import { SubAgent } from '../../domain/subAgent.entity';
  import { SubAgentService } from '../../use-cases/subAgent.service';
import { UpdateSubAgentDto } from './dto/update-subAgent.dto';
import { Console } from 'console';
  
  @Controller('subAgent')
  export class SubAgentController {
    constructor(private subAgentService: SubAgentService) {}
  
    @Get()
    getSubAgents(): Promise<SubAgent[]> {
      return this.subAgentService.getAllSubAgents();
    }
  
    
    @Get('/subAgencyNumber/:subAgencyNumber')
    getSubAgentBySubAgencyNumber(@Param('subAgencyNumber') subAgencyNumber: string): Promise<SubAgent> {
      return this.subAgentService.getSubAgentBySubAgencyNumber(subAgencyNumber);
    }
  

    @Get('/:id')
    getSubAgentById(@Param('id') id: number): Promise<SubAgent> {
      return this.subAgentService.getSubAgentById(id);
    }
  
    

    @Post()
    createSubAgent(@Body() createSubAgentDto: CreateSubAgenttDto): Promise<SubAgent> {
       
      return this.subAgentService.createSubAgent(createSubAgentDto);
      
    }

      
    @Put()
    updateSubAgent(@Body() updateSubAgentDto: UpdateSubAgentDto): Promise<SubAgent> {
      return this.subAgentService.updateSubAgent(updateSubAgentDto);
    }

 

    @Delete()
    deleteSubAgent(@Param('id') id: number):Promise<SubAgent>{
      return this.subAgentService.deleteSubAgent(id);
    }

     
    @Patch('/state/:id')
    updateStateSubAgent(@Param('id') id: number) {
    this.subAgentService.updateStateSubAgent(id);
    }
  }
  
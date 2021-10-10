import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  import { CreateExpedientDto } from './dto/create-expedient.dto';
  import { Expedient } from '../../domain/expedient.entity';
  import { ExpedientService } from '../../use-cases/expedient.service';
  
  @Controller('expedient')
  export class ExpedientController {
    constructor(private expedientService: ExpedientService) {}
  
    @Get()
    getExpedients(): Promise<Expedient[]> {
      return this.expedientService.getAllExpedients();
    }
  
    @Get('/:id')
    getExpedientById(@Param('id') id: number): Promise<Expedient> {
      return this.expedientService.getExpedientById(id);
    }
  
    @Post()
    createExpedient(@Body() createExpedientDto: CreateExpedientDto): Promise<Expedient> {
      return this.expedientService.createExpedient(createExpedientDto);
    }
  }
  
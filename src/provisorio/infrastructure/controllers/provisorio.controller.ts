import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateProvisoriotDto } from './dto/create-provisorio.dto';
  import { UpdateProvisorioDto } from './dto/update-provisorio.dto';
  import { Provisorio } from '../../domain/provisorio.entity';
  import { ProvisorioService } from '../../use-cases/provisorio.service';

  
  @Controller('provisorio')
  export class ProvisorioController {
    constructor(private provisorioService: ProvisorioService) {}
  
    @Get()
    getProvisorios(): Promise<Provisorio[]> {
      return this.provisorioService.getAllProvisorios();
    }
  
    @Get('/:id')
    getProvisorioById(@Param('id') id: number): Promise<Provisorio> {
      return this.provisorioService.getProvisorioById(id);
    }
  
    @Post()
    createProvisorio(@Body() createProvisorioDto: CreateProvisoriotDto): Promise<Provisorio> {
      return this.provisorioService.createProvisorio(createProvisorioDto);
    }

      
    @Put()
    updateProvisorio(@Body() updateProvisorioDto: UpdateProvisorioDto): Promise<Provisorio> {
      return this.provisorioService.updateProvisorio(updateProvisorioDto);
    }

    @Delete()
    deleteProvisorio(@Param('id') id: number):Promise<Provisorio>{
      return this.provisorioService.deleteProvisorio(id);
    }


  }
  
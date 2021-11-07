import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";

import { createReadStream, readFile, WriteStream } from "fs";
import { join } from "path";
import { CreateSubAgenttDto } from "./dto/create-subAgent.dto";
import { SubAgent } from "../../domain/subAgent.entity";
import { SubAgentService } from "../../use-cases/subAgent.service";
import { UpdateSubAgentDto } from "./dto/update-subAgent.dto";
import { Console } from "console";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("subAgent")
export class SubAgentController {
  constructor(private subAgentService: SubAgentService) {}

  @Get()
  getSubAgents(): Promise<SubAgent[]> {
    return this.subAgentService.getAllSubAgents();
  }

  @Get("/subAgencyNumber/:subAgencyNumber")
  getSubAgentBySubAgencyNumber(@Param("subAgencyNumber") subAgencyNumber: string): Promise<SubAgent> {
    return this.subAgentService.getSubAgentBySubAgencyNumber(subAgencyNumber);
  }

  @Get("/documentNumber/:documentNumber")
  getSubAgentByDocumentNumber(@Param("documentNumber") documentNumber: string): Promise<SubAgent> {
    return this.subAgentService.getSubAgentByDocumentNumber(documentNumber);
  }

  @Get("/:id")
  getSubAgentById(@Param("id") id: number): Promise<SubAgent> {
    return this.subAgentService.getSubAgentById(id);
  }

  @Post()
  createSubAgent(@Body() createSubAgentDto: CreateSubAgenttDto): Promise<SubAgent> {
    console.log(createSubAgentDto.notificar);
    return this.subAgentService.createSubAgent(createSubAgentDto);
  }

  @Put()
  updateSubAgent(@Body() updateSubAgentDto: UpdateSubAgentDto): Promise<SubAgent> {
    return this.subAgentService.updateSubAgent(updateSubAgentDto);
  }

  @Delete()
  deleteSubAgent(@Param("id") id: number): Promise<SubAgent> {
    return this.subAgentService.deleteSubAgent(id);
  }

  @Put("/editStateSubAgent/:subAgencyNumber")
  updateStateSubAgent(@Param("subAgencyNumber") subAgencyNumber: string) {
    this.subAgentService.updateStateSubAgent(subAgencyNumber);
  }

  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: function (req, file, cb) {
          cb(null, Date.now() + "-" + file.originalname);
        },
      }),
    })
  )
  @Post("file")
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      msg: "Arcivo  cargado correctamente",
    };
  }

  @Get("getFile")
  getFile(@Res() res) {
    const fielName = "DiagramaBase.PNG";
    res.setJeader("Content-Type", "application/octet-stream");
    res.attachment(fielName);
    return res.download("./uploads/" + fielName);
  }
}

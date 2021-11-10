import { Body, Catch, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";

import { createReadStream, readFile, WriteStream } from "fs";
import { join } from "path";
import { CreateSubAgenttDto } from "./dto/create-subAgent.dto";
import { SubAgent } from "../../domain/subAgent.entity";
import { SubAgentService } from "../../use-cases/subAgent.service";
import { UpdateSubAgentDto } from "./dto/update-subAgent.dto";
import { Console } from "console";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { url } from "inspector";
import { Exception } from "handlebars";

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
        // destination: "./uploads",
        destination: "D:\\",
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

  //Si le pego desde navegador funciona : http://localhost:5000/subAgent/getFile/1/DiagramaBase.PNG

  @Get("/getFile/:id/:Url")
  getFile(@Res() res, @Param("id") id: number, @Param("Url") Url: string) {
    try {
      console.log("Url por param:  " + Url);
      res.download("D:\\" + Url.toString());
    } catch (Exception) {
      console.log("ERROR");
    }
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateProvisoriotDto } from "./dto/create-provisorio.dto";
import { UpdateProvisorioDto } from "./dto/update-provisorio.dto";
import { Provisorio } from "../../domain/provisorio.entity";
import { ProvisorioService } from "../../use-cases/provisorio.service";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";

import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("provisorio")
export class ProvisorioController {
  constructor(private provisorioService: ProvisorioService) {}

  @Get()
  getProvisorios(): Promise<Provisorio[]> {
    return this.provisorioService.getAllProvisorios();
  }

  @Get("/getEnabledProvisorio")
  getEnabledProvisorio(): Promise<Provisorio[]> {
    return this.provisorioService.getEnabledProvisorio();
  }

  @Get("/:id")
  getProvisorioById(@Param("id") id: number): Promise<Provisorio> {
    return this.provisorioService.getProvisorioById(id);
  }

  @UseInterceptors(
    FileInterceptor("CreateProvisoriotDto.url", {
      storage: diskStorage({
        destination: "./uploads",

        // destination: "D:\\",
        filename: function (req, file, cb) {
          cb(null, Date.now() + "-" + file.originalname);
        },
      }),
    })
  )
  @Post()
  createProvisorio(@Body() createProvisorioDto: CreateProvisoriotDto): Promise<SubAgent> {
    return this.provisorioService.createProvisorio(createProvisorioDto);
  }

  @Put()
  updateProvisorio(@Body() updateProvisorioDto: UpdateProvisorioDto): Promise<Provisorio> {
    return this.provisorioService.updateProvisorio(updateProvisorioDto);
  }

  @Delete()
  deleteProvisorio(@Param("id") id: number): Promise<Provisorio> {
    return this.provisorioService.deleteProvisorio(id);
  }

  @Patch("/state/:id")
  updateStateProvisorio(@Param("id") id: number) {
    this.provisorioService.updateStateProvisorio(id);
  }

  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",

        filename: function (req, file, cb) {
          cb(null, file.originalname + ".pdf");
        },
      }),
    })
  )
  @Post("file")
  uploadFile(@UploadedFile() fileParam: Express.Multer.File) {
    try {
      return {
        msg: "Arcivo  cargado correctamente",
      };
    } catch {
      console.log("Error");
    }
  }

  @Get("/getFile/:id/:nameType/:subAgencyNumber")
  getFile(@Res() res, @Param("id") id: number, @Param("nameType") nameType: string, @Param("subAgencyNumber") subAgencyNumber: string) {
    try {
      let ruta = "./uploads/";
      res.download(ruta + nameType.toString());
    } catch (Exception) {
      console.log("ERROR");
    }
  }
}

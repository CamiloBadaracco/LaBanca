import { Body, Catch, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateSubAgentDto } from "./dto/create-subAgent.dto";
import { SubAgent } from "../../domain/subAgent.entity";
import { SubAgentService } from "../../use-cases/subAgent.service";
import { UpdateSubAgentDto } from "./dto/update-subAgent.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("subAgent")
export class SubAgentController {
  constructor(private subAgentService: SubAgentService) {}

  @Get()
  getSubAgents(): Promise<SubAgent[]> {
    return this.subAgentService.getAllSubAgents();
  }

  @Get("/getEnableSubAgents")
  getEnableAgents(): Promise<SubAgent[]> {
    return this.subAgentService.getEnableSubAgents();
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
  createSubAgent(@Body() createSubAgentDto: CreateSubAgentDto): Promise<SubAgent> {
    return this.subAgentService.createSubAgent(createSubAgentDto);
  }

  @Put()
  updateSubAgent(@Body() createSubAgentDto: CreateSubAgentDto): Promise<SubAgent> {
    return this.subAgentService.updateSubAgent(createSubAgentDto);
  }

  @Delete()
  deleteSubAgent(@Param("id") id: number): Promise<SubAgent> {
    return this.subAgentService.deleteSubAgent(id);
  }

  @Put("/editStateSubAgent/:subAgencyNumber")
  updateStateSubAgent(@Param("subAgencyNumber") subAgencyNumber: string) {
    this.subAgentService.updateStateSubAgent(subAgencyNumber);
  }

  //#region  Manejo Files [Upload & Get]
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

      // res.download("D:\\" + Url.toString());
    } catch (Exception) {
      console.log("ERROR");
    }
  }

  //#endregion
}

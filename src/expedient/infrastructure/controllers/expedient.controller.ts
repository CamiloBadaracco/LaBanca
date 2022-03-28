import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateExpedientDto } from "./dto/create-expedient.dto";
import { Expedient } from "../../domain/expedient.entity";
import { ExpedientService } from "../../use-cases/expedient.service";
import { UpdateExpedientDto } from "./dto/update-expedient.dto";
import { SubAgent } from "src/subAgent/domain/subAgent.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("expedient")
export class ExpedientController {
  constructor(private expedientService: ExpedientService) {}

  @Get()
  getExpedients(): Promise<Expedient[]> {
    return this.expedientService.getAllExpedients();
  }

  @Get("/getEnableExpedient")
  getEnableExpedient(): Promise<Expedient[]> {
    return this.expedientService.getEnableExpedient();
  }

  @Get("/:id")
  getExpedientById(@Param("id") id: number): Promise<Expedient> {
    return this.expedientService.getExpedientById(id);
  }

  @Post()
  createExpedient(@Body() createExpedientDto: CreateExpedientDto): Promise<SubAgent> {
    return this.expedientService.createExpedient(createExpedientDto);
  }

  @Put()
  updateExpedient(@Body() updateExpedientDto: UpdateExpedientDto): Promise<Expedient> {
    return this.expedientService.updateExpedient(updateExpedientDto);
  }

  @Delete()
  deleteExpedient(@Param("id") id: number): Promise<Expedient> {
    return this.expedientService.deleteExpedient(id);
  }

  @Patch("/state/:id")
  updateStateExpedient(@Param("id") id: number) {
    this.expedientService.updateStateExpedient(id);
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

  //#endregion
}

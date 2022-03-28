import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { File } from "../../domain/file.entity";
import { CreateFileDto } from "./dto/create-file.dto";
import { FileService } from "src/file/file-cases/file.service";
import { Exception } from "handlebars";

@Controller("file")
export class FileController {
  constructor(private fileService: FileService) {}

  @Get()
  async getFiles(): Promise<File[]> {
    return await this.fileService.getAllFiles();
  }

  @Get("/:id")
  async getFileById(@Param("id") id: String): Promise<File> {
    console.log("id entro" + id);
    return await this.fileService.getFileById(id);
  }

  @Get("/getFileBySubAgAndType/:subAgencyNumber/:type")
  async getFileBySubAgAndType(@Param("subAgencyNumber") subAgencyNumber, @Param("type") type): Promise<File> {
    return await this.fileService.getFileBySubAgAndType(subAgencyNumber, type);
  }

  @Post()
  async createFile(@Body() createFileDto: CreateFileDto) {
    console.log("Paso por el create File Controller");
    return await this.fileService.createFile(createFileDto);
  }

  @Put()
  updateAgent(@Body() updateAgentDto: CreateFileDto): Promise<File> {
    return this.fileService.editStateFile(updateAgentDto);
  }

  @Get("/getFile/:id/:subAgencyNumber/:nameType")
  async getFile(@Res() res, @Param("id") id: number, @Param("subAgencyNumber") subAgencyNumber: string, @Param("nameType") nameType: string) {
    try {
      const FileEnt = await this.fileService.getFileBySubAgAndType(subAgencyNumber, nameType);
      if (FileEnt) {
        let ruta = "./uploads/" + FileEnt.name + ".pdf";

        res.download(ruta);
      } else {
        throw new Exception("No se encontro archivo");
      }
    } catch (Exception) {
      console.log("ERROR");
    }
  }

  // Historial usado para provisorio y expediente
  @Get("/getFileHistory/:url")
  async getFileHistory(@Res() res, @Param("url") url: string) {
    try {
      console.log(url);

      const FileEnt = await this.fileService.getFileHistoryBySubAgAndType(url);
      if (FileEnt) {
        console.log(FileEnt.name);

        let ruta = "./uploads/" + FileEnt.name + ".pdf";

        console.log(ruta);
        res.download(ruta);
      } else {
        throw new Exception("No se encontro archivo");
      }
    } catch (Exception) {
      console.log("ERROR");
    }
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { Agent } from "../../domain/agent.entity";
import { AgentService } from "../../use-cases/agent.service";
import { UpdateAgentDto } from "./dto/update-agent.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("agent")
export class AgentController {
  constructor(private agentsService: AgentService) {}

  @Get()
  getAgents(): Promise<Agent[]> {
    return this.agentsService.getAllAgents();
  }

  @Get("/getAgents2")
  getAgents2(): string {
    return "prueba";
  }

  @Get("/getEnableAgents")
  getEnableAgents(): Promise<Agent[]> {
    return this.agentsService.getEnableAgents();
  }

  @Get("/:agencyNumber")
  getAgentById(@Param("agencyNumber") agencyNumber: string): Promise<Agent> {
    return this.agentsService.getAgentById(agencyNumber);
  }

  @Post()
  createAgent(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentsService.createAgent(createAgentDto);
  }

  @Put()
  updateAgent(@Body() updateAgentDto: UpdateAgentDto): Promise<Agent> {
    return this.agentsService.updateAgent(updateAgentDto);
  }

  @Delete("/:agencyNumber")
  deleteAgent(@Param("agencyNumber") agencyNumber: string): Promise<Agent> {
    return this.agentsService.deleteAgent(agencyNumber);
  }

  @Put("/editStateAgent")
  editStateAgent(@Body() updateAgentDto: UpdateAgentDto): Promise<Agent> {
    return this.agentsService.editStateAgent(updateAgentDto.newAgencyNumber);
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

  @Get("/getFile/:id/:nameType/:agencyNumber")
  getFile(@Res() res, @Param("id") id: number, @Param("nameType") nameType: string, @Param("agencyNumber") agencyNumber: string) {
    try {
      let ruta = "./uploads/";
      res.download(ruta + nameType.toString());
    } catch (Exception) {
      console.log("ERROR");
    }
  }
  //#endregion
}

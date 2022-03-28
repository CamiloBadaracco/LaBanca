import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateUserAgentDto } from "./dto/create-userAgent.dto";
import { UserAgent } from "../../domain/userAgent.entity";
import { UserAgentService } from "../../use-cases/userAgent.service";
import { UpdateUserAgentDto } from "./dto/update-userAgent.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("userAgent")
export class UserAgentController {
  constructor(private userAgentsService: UserAgentService) {}

  @Get()
  getUserAgents(): Promise<UserAgent[]> {
    return this.userAgentsService.getAllUserAgents();
  }

  @Get("/getEnableUserAgents")
  getEnableUserAgents(): Promise<UserAgent[]> {
    return this.userAgentsService.getEnableUserAgents();
  }

  @Get("/:documentUser")
  getUserAgentById(@Param("documentUser") documentUser: string): Promise<UserAgent> {
    console.log(documentUser);
    return this.userAgentsService.getUserAgentById(documentUser);
  }

  @Get("/getUserAgentByAgencyNumber/:agencyNumber")
  getUserAgentByAgencyNumber(@Param("agencyNumber") agencyNumber: string): Promise<UserAgent[]> {
    return this.userAgentsService.getUserAgentByAgencyNumber(agencyNumber);
  }

  @Post()
  createUserAgent(@Body() createUserAgentDto: CreateUserAgentDto): Promise<UserAgent> {
    return this.userAgentsService.createUserAgent(createUserAgentDto);
  }

  @Put()
  updateUserAgent(@Body() updateUserAgentDto: UpdateUserAgentDto): Promise<UserAgent> {
    console.log(updateUserAgentDto);
    return this.userAgentsService.updateUserAgent(updateUserAgentDto);
  }

  @Delete("/:documentUser")
  deleteUserAgent(@Param("documentUser") documentUser: string): Promise<UserAgent> {
    return this.userAgentsService.deleteUserAgent(documentUser);
  }

  @Put("/editStateUserAgent")
  editStateUserAgent(@Body() updateAgentDto: UpdateUserAgentDto): Promise<UserAgent> {
    return this.userAgentsService.editStateUserAgent(updateAgentDto);
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

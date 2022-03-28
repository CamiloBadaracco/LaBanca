import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File as FileEntity } from "../domain/file.entity";
import { CreateFileDto } from "../infrastructure/controllers/dto/create-file.dto";
import { FileRepository } from "../infrastructure/repository/file.respository";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository
  ) {}

  async getAllFiles(): Promise<FileEntity[]> {
    return this.fileRepository.getFiles();
  }

  async getFileById(id: String): Promise<FileEntity> {
    const found = await this.fileRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`id not found`);
    }

    return found;
  }

  async getFileBySubAgAndType(subAgencyNumberParam: string, typeParam: string): Promise<FileEntity> {
    const found = await this.fileRepository.findOne({ where: { subAgencyNumber: subAgencyNumberParam, type: typeParam, active: true } });

    if (!found) {
      throw new NotFoundException(` No existe documento ACTIVO para el  subAgente  y Tipo ingresado  .`);
    }

    return found;
  }

  async getFileHistoryBySubAgAndType(nameParam: string): Promise<FileEntity> {
    console.log("nameParam " + nameParam);
    const found = await this.fileRepository.findOne({ where: { name: nameParam } });

    if (!found) {
      throw new NotFoundException(` No existe documento ACTIVO para el  subAgente  y Tipo ingresado  .`);
    }

    return found;
  }

  async createFile(createFileDto: CreateFileDto): Promise<FileEntity> {
    const { type, subAgencyNumber } = createFileDto;
    const file = new FileEntity();
    file.id = 0;
    file.type = type;
    file.subAgencyNumber = subAgencyNumber;
    file.name = file.CreateName(subAgencyNumber, type, file.id);
    file.active = true;
    // baja loigica tabla file
    this.editStateFile(createFileDto);
    //alta
    const result = await file.save();

    console.log("llega aca alta  ALTA FILE EN TABLA ");
    if (result) {
      //Si lo dio de alta, modificamos nombre para agregarle el ID generado
      console.log("UPDATE FILE EN TABLA ");
      this.fileRepository.updateFile(file);
    }

    return result;
  }

  async editStateFile(createFileDto: CreateFileDto): Promise<FileEntity> {
    try {
      const found = await this.fileRepository.findOne({ where: { subAgencyNumber: createFileDto.subAgencyNumber, type: createFileDto.type, active: true } });

      if (!found) {
        return null;
      }

      found.active = false;
      console.log("Modificar estado de file anterior");
      await this.fileRepository.updateFileState(found);
    } catch (err) {}
  }

  /*
  async generatAndCreateFile(createSubAgentDto: CreateSubAgentDto): Promise<Array[]> {
    try {
      var listFile = new Array();

      let objFile = new CreateFileDto();

      if (createSubAgentDto.documentIdPhoto) {
        objFile = new CreateFileDto();
        objFile.subAgencyNumber = createSubAgentDto.subAgencyNumber;
        objFile.type = "documentIdPhoto";
        listFile.push(this.createFile(objFile));
      }

      if (createSubAgentDto.formNineHundred) {
        objFile = new CreateFileDto();
        objFile.subAgencyNumber = createSubAgentDto.subAgencyNumber;
        objFile.type = "formNineHundred";
        listFile.push(this.createFile(objFile));
      }

      if (createSubAgentDto.passportPhoto) {
        objFile = new CreateFileDto();
        objFile.subAgencyNumber = createSubAgentDto.subAgencyNumber;
        objFile.type = "passportPhoto";
        listFile.push(this.createFile(objFile));
      }

      if (createSubAgentDto.certificateGoodConduct) {
        objFile = new CreateFileDto();
        objFile.subAgencyNumber = createSubAgentDto.subAgencyNumber;
        objFile.type = "certificateGoodConduct";
        listFile.push(this.createFile(objFile));
      }

      if (createSubAgentDto.documentDGI) {
        objFile = new CreateFileDto();
        objFile.subAgencyNumber = createSubAgentDto.subAgencyNumber;
        objFile.type = "documentDGI";
        listFile.push(this.createFile(objFile));
      }

      if (createSubAgentDto.literalE) {
        objFile = new CreateFileDto();
        objFile.subAgencyNumber = createSubAgentDto.subAgencyNumber;
        objFile.type = "literalE";
        listFile.push(this.createFile(objFile));
      }

      if (createSubAgentDto.enabledDocument) {
        objFile = new CreateFileDto();
        objFile.subAgencyNumber = createSubAgentDto.subAgencyNumber;
        objFile.type = "enabledDocument";
        listFile.push(this.createFile(objFile));
      }

      if (createSubAgentDto.cesantiaDocument) {
        objFile = new CreateFileDto();
        objFile.subAgencyNumber = createSubAgentDto.subAgencyNumber;
        objFile.type = "cesantiaDocument";
        listFile.push(this.createFile(objFile));
      }

      if (createSubAgentDto.changeAddressDocument) {
        objFile = new CreateFileDto();
        objFile.subAgencyNumber = createSubAgentDto.subAgencyNumber;
        objFile.type = "changeAddressDocument";
        listFile.push(this.createFile(objFile));
      }
      return listFile;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }*/
}

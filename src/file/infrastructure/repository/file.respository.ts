import { EntityRepository, Repository } from "typeorm";
import { File as FileEntity } from "../../domain/file.entity";

@EntityRepository(FileEntity)
export class FileRepository extends Repository<FileEntity> {
  async getFiles(): Promise<FileEntity[]> {
    const query = this.createQueryBuilder("file");
    return query.getMany();
  }

  async createFile(objFile: FileEntity): Promise<FileEntity> {
    await objFile.save();
    return objFile;
  }

  async updateFile(objFile: FileEntity): Promise<FileEntity> {
    objFile.name = objFile.CreateName(objFile.subAgencyNumber, objFile.type, objFile.id);
    await objFile.save();
    return objFile;
  }

  /*Metodo que sera utilizado en el editar SUb Agente, de venir algun documento , se debera dar de baja el que ya estaba (active: false), en el creear sub agente no es necesario porque da de alta todo de nuevo */
  async updateFileState(fileParam: FileEntity) {
    this.createQueryBuilder("file").update(FileEntity).set({ active: false }).where("type = :type ", { type: fileParam.type }).andWhere("subAgencyNumber = :subAgencyNumber", { subAgencyNumber: fileParam.subAgencyNumber }).execute();
  }
}

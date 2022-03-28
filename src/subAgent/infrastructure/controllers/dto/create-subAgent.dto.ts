import { isArray, IsNotEmpty, IsString } from "class-validator";
import { Agent } from "src/agent/domain/agent.entity";
import { Address } from "src/address/domain/address.entity";
import { Expedient } from "src/expedient/domain/expedient.entity";
import { Provisorio } from "src/provisorio/domain/provisorio.entity";

export class CreateSubAgentDto {
  @IsNotEmpty()
  subAgencyNumber: string;

  @IsNotEmpty()
  agencyNumber: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsString()
  firstName: string;

  @IsString()
  secondFirstName: string;

  @IsString()
  firstLastName: string;

  @IsString()
  secondLastName: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  rut: string;

  @IsNotEmpty()
  literalE: boolean;

  @IsNotEmpty()
  agent: Agent;

  @IsNotEmpty()
  address: Address;

  @IsNotEmpty()
  expedient: Expedient;

  @IsNotEmpty()
  provisorio: Provisorio;

  @IsNotEmpty()
  notificar: boolean;

  @IsNotEmpty()
  listDocumentCargados: Array<String>;
}

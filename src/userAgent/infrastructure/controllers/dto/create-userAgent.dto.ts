import { IsNotEmpty } from "class-validator";
import { Agent } from "src/agent/domain/agent.entity";
import { Notification } from "src/notification/domain/notification.entity";
Notification;
export class CreateUserAgentDto {
  @IsNotEmpty()
  documentUser: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  firstLastName: string;

  @IsNotEmpty()
  secondLastName: string;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  expedientUp: string;

  @IsNotEmpty()
  expedientDown: string;

  @IsNotEmpty()
  patentAgent: string;

  @IsNotEmpty()
  observation: string;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  agencyNumber: string;

  @IsNotEmpty()
  agent: Agent;

  @IsNotEmpty()
  listDocumentCargados: Array<String>;
}

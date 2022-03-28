import { IsEmpty, IsNotEmpty } from "class-validator";
import { Agent } from "src/agent/domain/agent.entity";

export class SendMailDto {
  @IsNotEmpty()
  addressMail: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  actionDescription: string;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  agencyNumber: string;
}

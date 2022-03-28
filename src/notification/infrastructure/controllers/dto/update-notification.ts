import { IsEmpty, IsNotEmpty } from "class-validator";
import { Agent } from "src/agent/domain/agent.entity";

export class UpdateNotificationDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  actionDescription: string;

  @IsNotEmpty()
  dateAction: Date;

  @IsNotEmpty()
  dateNotif: Date;

  @IsNotEmpty()
  agent: Agent;

  @IsNotEmpty()
  agencyMail: string;

  @IsNotEmpty()
  sended: boolean;

  @IsNotEmpty()
  subAgencyModified: string;
}

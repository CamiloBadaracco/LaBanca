import { IsEmpty, IsNotEmpty } from "class-validator";
import { Agent } from "src/agent/domain/agent.entity";

export class CreateNotificationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  actionDescription: string;

  @IsNotEmpty()
  agencyNumber: string;

  @IsNotEmpty()
  subAgencyModified: string;

  @IsNotEmpty()
  sended: boolean;
}

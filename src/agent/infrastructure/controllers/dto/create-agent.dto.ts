import { IsNotEmpty } from "class-validator";
import { Notification } from "src/notification/domain/notification.entity";
Notification;
export class CreateAgentDto {
  @IsNotEmpty()
  agencyNumber: string;

  @IsNotEmpty()
  orden: string;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  zone: string;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  notification: Notification;
}

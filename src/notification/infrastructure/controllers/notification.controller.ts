import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { Notification } from "src/notification/domain/notification.entity";
import { NotificationService } from "src/notification/use-cases/notification.service";

@Controller("notification")
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  getAllNotifications(): Promise<Notification[]> {
    return this.notificationService.getAllNotifications();
  }

  @Get("/notificated")
  getNotificated(): Promise<Notification[]> {
    return this.notificationService.getNotificated();
  }

  @Get("/notNotificated")
  getNotNotificated(): Promise<Notification[]> {
    return this.notificationService.getNotNotificated();
  }

  @Get("subAgencyNumber/:subAgencyNumber")
  getNotificationBySubAgent(@Param("subAgencyNumber") subAgencyNumber: string): Promise<Notification[]> {
    return this.notificationService.getNotificationBySubAgent(subAgencyNumber);
  }

  @Put("/notificationSended")
  updateNotificationSended(@Body() updateNotificationDto: Notification): Promise<Notification> {
    return this.notificationService.updateNotificationSended(updateNotificationDto.id, updateNotificationDto.agent.agencyNumber.toString());
  }
}

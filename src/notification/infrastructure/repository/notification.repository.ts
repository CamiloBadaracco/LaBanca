import { EntityRepository, Repository } from "typeorm";
import { Notification } from "src/notification/domain/notification.entity";
import { Agent } from "src/agent/domain/agent.entity";

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
  async getNotifications(): Promise<Notification[]> {
    const query = this.createQueryBuilder("notification").leftJoinAndSelect("notification.agent", "agent");
    return await query.getMany();
  }

  async getNotificated(): Promise<Notification[]> {
    const query = this.createQueryBuilder("notification").leftJoinAndSelect("notification.agent", "agent").where("notification.sended = true");
    return await query.getMany();
  }

  async getNotNotificated(): Promise<Notification[]> {
    const query = this.createQueryBuilder("notification").leftJoinAndSelect("notification.agent", "agent").where("notification.sended = false");
    return await query.getMany();
  }

  async getNotificationBySubAgent(subAgencyNumber: string): Promise<Notification[]> {
    const query = this.createQueryBuilder("notification");
    return await query.getMany();
  }

  async createNotification(notif: Notification): Promise<Notification> {
    await notif.save();
    return notif;
  }

  async updateNotification(notifParam: Notification): Promise<Notification> {
    await notifParam.save();
    return notifParam;
  }
}

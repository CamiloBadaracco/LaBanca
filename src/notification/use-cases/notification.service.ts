import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgentService } from "src/agent/use-cases/agent.service";
import { SendMailDto } from "src/mail/infrastructure/controllers/dto/send-mail.dto";
import { MailService } from "src/mail/use-cases/mail.service";
import { SimpleConsoleLogger } from "typeorm";
import { Agent } from "../../agent/domain/agent.entity";
import { Notification } from "../domain/notification.entity";
import { CreateNotificationDto } from "../infrastructure/controllers/dto/create-notification.dto";
import { UpdateNotificationDto } from "../infrastructure/controllers/dto/update-notification";
import { NotificationRepository } from "../infrastructure/repository/notification.repository";

@Injectable()
export class NotificationService {
  constructor(@InjectRepository(NotificationRepository) private NotificationRepository: NotificationRepository, private agentService: AgentService, private MailService: MailService) {}

  async getAllNotifications(): Promise<Notification[]> {
    return await this.NotificationRepository.getNotifications();
  }
  async getNotificated(): Promise<Notification[]> {
    return await this.NotificationRepository.getNotificated();
  }

  async getNotNotificated(): Promise<Notification[]> {
    return await this.NotificationRepository.getNotNotificated();
  }

  async getNotificationBySubAgent(subAgencyNumber: string): Promise<Notification[]> {
    return this.NotificationRepository.getNotificationBySubAgent(subAgencyNumber);
  }

  async getSubNotificationById(id: number): Promise<Notification> {
    const found = await this.NotificationRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`SubAgent with ID "${id}" not found`);
    }
    return found;
  }

  async createNotification(agent: Agent, createNotificationDto: CreateNotificationDto): Promise<Notification> {
    try {
      const { title, actionDescription, agencyNumber, subAgencyModified, sended } = createNotificationDto;

      //Armo Notif final
      const notif = new Notification();
      notif.id = 0;
      notif.title = title;
      notif.actionDescription = actionDescription;
      notif.dateAction = new Date();
      notif.dateNotif = new Date();
      notif.subAgencyModified = subAgencyModified;
      notif.sended = sended;
      notif.agent = agent;

      var listNotifAgregar = new Array<Notification>();
      listNotifAgregar.push(notif);

      return await this.NotificationRepository.createNotification(notif);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async updateNotification(notifParam: Notification): Promise<Notification> {
    return await this.NotificationRepository.updateNotification(notifParam);
  }

  async updateNotificationSended(id: number, agentNumber: string): Promise<Notification> {
    const notif = await this.getSubNotificationById(id);

    if (!notif) {
      throw new HttpException("Agent [mail] no existe", 794);
    }

    /*Enviar mail  /*Modificar tabla noificaciones para poner como enviado .*/
    let objMail = new SendMailDto();
    objMail.title = notif.title;
    objMail.addressMail = "";
    objMail.actionDescription = notif.actionDescription;
    objMail.agencyNumber = agentNumber;

    const agent = await this.agentService.getAgentById(agentNumber);
    if (!agent) {
      throw new HttpException("El Agente a notificar no existe", 793);
    }

    if (agent.mail == undefined || agent.mail == "") {
      console.log("El agente no tiene mail registrado *");
      throw new HttpException("El agente no tiene mail asociado", 794);
    }

    this.MailService.UpdateAndSendNotificationMail(objMail);

    //Si se envia mail ,    modifico tabla de notificacion para poner que fue notificado
    notif.sended = true;
    notif.dateNotif = new Date();
    return await this.NotificationRepository.updateNotification(notif);
  }
}

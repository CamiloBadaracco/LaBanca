import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Agent } from "src/agent/domain/agent.entity";
import { AgentService } from "src/agent/use-cases/agent.service";
import { Notification } from "src/notification/domain/notification.entity";
import { NotificationService } from "src/notification/use-cases/notification.service";
import { UserAgentService } from "src/userAgent/use-cases/userAgent.service";
import { SendMailDto } from "../infrastructure/controllers/dto/send-mail.dto";

const nodemailer = require("nodemailer");

@Injectable()
export class MailService {
  constructor(private config: ConfigService, private agentService: AgentService, private userAgentService: UserAgentService) {}

  async UpdateAndSendNotificationMail(sendDto: SendMailDto): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: this.config.get("EMAIL_PORT"),
      secure: true,
      auth: {
        user: this.config.get<string>("EMAIL"),
        pass: this.config.get<string>("PASSWORD"), // password generada en google
      },
    });

    let mail: string = "";

    const agent = await this.agentService.getAgentById(sendDto.agencyNumber);
    if (!agent) {
      throw new HttpException("Revisar Agente a notificar", 793);
    }

    if (agent.mail.toString() != "") {
      mail = agent.mail.toString() + ";";
    }

    const userAgent = await this.userAgentService.getUserAgentByAgencyNumber(sendDto.agencyNumber);

    if (userAgent) {
      for (let i = 0; i < userAgent.length; i++) {
        if (userAgent[i].mail.toString() != "") {
          mail += userAgent[i].mail.toString() + ";";
        }
      }
    }
    console.log("mail  " + mail);

    if (mail.toString() != "") {
      console.log("Encvia mail");
      transporter.sendMail({
        from: this.config.get<string>("SENDED_FROM"),
        to: mail,
        subject: sendDto.title + "✔",
        html: "<b>" + sendDto.actionDescription + "</b>", // html body
      });
    }
  }
}

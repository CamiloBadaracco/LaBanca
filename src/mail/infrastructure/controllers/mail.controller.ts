import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Notification } from "src/notification/domain/notification.entity";
import { MailService } from "../../use-cases/mail.service";
import { SendMailDto } from "./dto/send-mail.dto";

@Controller("mail")
export class MailController {
  constructor(private mailsService: MailService) {}
}

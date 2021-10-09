import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SendInviteUsersMailDto } from './dto/send-invite-users-mail.dto';
import { MailService } from '../../use-cases/mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailsService: MailService) {}

  @Post()
  sendMail(
    @Body() sendInviteUsersMailDto: SendInviteUsersMailDto,
  ): Promise<SendInviteUsersMailDto> {
    return this.mailsService.sendInviteUsersMail(sendInviteUsersMailDto);
  }
}

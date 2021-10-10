/*import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SendInviteUsersMailDto } from '../infrastructure/controllers/dto/send-invite-users-mail.dto';
import { createTransport } from 'nodemailer';
import { EMAIL_INVITATION } from '../infrastructure/templates/user-invitation';
import { SurveyRepository } from '../../survey/infrastructure/repository/survey.repository';
import { Survey } from '../../survey/domain/survey.entity';
import { request } from 'http';
import { RabbitMQService } from '../../rabbitMQ/use-cases/rabbit-mq.service';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(SurveyRepository)
    private surveyRepository: SurveyRepository,
    private rabbitMQService: RabbitMQService,
  ) {}

  async sendInviteUsersMail(
    sendInviteUsersMailDto: SendInviteUsersMailDto,
  ): Promise<SendInviteUsersMailDto> {
    try {
      const { surveyId, usersMails } = sendInviteUsersMailDto;
      const survey = await this.getSurveyById(surveyId);
      usersMails.forEach((email) => {
        this.sendEmail(email, 'message', survey.project, surveyId);
        this.sendUser(email, surveyId);
        survey.guests = survey.guests + 1;
        this.surveyRepository.updateSurvey(survey);
      });
      return sendInviteUsersMailDto;
    } catch (error) {
      throw new NotFoundException(
        `Send Invite Mail for users fails: "${error.message}"`,
      );
    }
  }

  async sendUser(email, surveyId) {
    var userReq = JSON.stringify({
      email: email,
      surveyId: surveyId,
    });
    this.rabbitMQService.send('rabbit-mq-producer', {
      body: userReq,
      url: '/usersurvey/createusersurvey',
      method: 'POST',
      headers: '',
    });
  }

  async sendEmail(email, message, project, surveyId) {
    var transporter = createTransport({
      service: process.env.SERVICE + '',
      auth: {
        user: process.env.EMAIL + '',
        pass: process.env.PASSWORD + '',
      },
    });

    var html = EMAIL_INVITATION.split('project_name').join(project);
    var htmlWithUrl = html
      .split('url_to_redirect')
      .join(process.env.WEBAPP_URL + '/login/' + surveyId);
    var mailOptions = {
      from: 'UX Quest<' + process.env.EMAIL + '>',
      to: email,
      subject: 'Invitation to participate completing a survey',
      text: message,
      html: htmlWithUrl,
      attachments: [
        {
          filename: 'logo.png',
          path: `${__dirname}/images/logo.png`,
          cid: 'logo',
        },
        {
          filename: 'header.png',
          path: `${__dirname}/images/header.png`,
          cid: 'header',
        },
        {
          filename: 'web.png',
          path: `${__dirname}/images/web.png`,
          cid: 'web',
        },
        {
          filename: 'twitter.png',
          path: `${__dirname}/images/twitter.png`,
          cid: 'twitter',
        },
        {
          filename: 'instagram.png',
          path: `${__dirname}/images/instagram.png`,
          cid: 'instagram',
        },
        {
          filename: 'linkedin.png',
          path: `${__dirname}/images/linkedin.png`,
          cid: 'linkedin',
        },
        {
          filename: 'takeMeThere.png',
          path: `${__dirname}/images/takeMeThere.png`,
          cid: 'takeMeThere',
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      console.log(error);
      console.log(info);
      if (error) {
        throw new NotFoundException(
          `Send Invite Mail for users fails: "${error.message}"`,
        );
      }
    });
  }

  async getSurveyById(id: number): Promise<Survey> {
    const found = await this.surveyRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Survey with ID "${id}" not found`);
    }

    return found;
  }
}
*/
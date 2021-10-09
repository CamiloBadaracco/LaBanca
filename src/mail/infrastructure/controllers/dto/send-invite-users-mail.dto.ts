import { IsNotEmpty } from 'class-validator';

export class SendInviteUsersMailDto {
  @IsNotEmpty()
  surveyId: number;

  @IsNotEmpty()
  usersMails: Array<String>;
}

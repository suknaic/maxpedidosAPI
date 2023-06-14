import { Process, Processor } from '@nestjs/bull';
import {
  IMailProvider,
  IMailProviderRequest,
} from '@shared/providers/MailProvider/model/IMailProvider';
import { Job } from 'bull';

@Processor('SendMail')
export class SendMailConsumer {
  constructor(private mailService: IMailProvider) {}

  @Process('sendMailJob')
  async function({ data }: Job<IMailProviderRequest>) {
    await this.mailService.sendMail(data);
  }
}

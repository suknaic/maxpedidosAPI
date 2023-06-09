import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { IMailProviderRequest } from '@shared/providers/MailProvider/model/IMailProvider';
import { Queue } from 'bull';

@Injectable()
export class SendMailProducerService {
  constructor(
    @InjectQueue('SendMail')
    private MailQueue: Queue,
  ) {}

  async sendMail(data: IMailProviderRequest) {
    await this.MailQueue.add('sendMailJob', data);
  }
}

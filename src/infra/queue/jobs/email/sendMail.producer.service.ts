import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import {
  IMailProvider,
  IMailProviderRequest,
} from '@shared/providers/MailProvider/model/IMailProvider';
import { Queue } from 'bull';
import { IMailQueue } from './IMailQueue';

@Injectable()
export class SendMailProducerService implements IMailQueue {
  constructor(
    @InjectQueue('SendMail')
    private MailQueue: Queue,
  ) {}

  async sendMail(data: IMailProviderRequest) {
    await this.MailQueue.add('sendMailJob', data);
  }
}

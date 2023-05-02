import { Injectable } from '@nestjs/common';
import { IMailProvider, IMailProviderRequest } from '../model/IMailProvider';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class EtherealMailProvider implements IMailProvider {
  private Client: nodemailer.Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transport = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.Client = transport;
      })
      .catch((err) => console.error(err));
  }

  async sendMail({
    to,
    subject,
    variables,
    path,
  }: IMailProviderRequest): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf8');
    const templateParse = handlebars.compile(templateFileContent);

    const templateHTMl = templateParse(variables);

    const message = await this.Client.sendMail({
      to,
      from: 'MaxPedidos <noreplay@maxpedidos.com.br>',
      subject,
      html: templateHTMl,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

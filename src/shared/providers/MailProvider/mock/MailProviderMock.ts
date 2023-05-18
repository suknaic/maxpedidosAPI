import { IMailProvider, IMailProviderRequest } from '../model/IMailProvider';

export class MailProviderMock implements IMailProvider {
  private messages: IMailProviderRequest[] = [];

  constructor() {
    this.messages = [];
  }

  async sendMail({
    to,
    subject,
    path,
    variables,
  }: IMailProviderRequest): Promise<void> {
    const message = { to, subject, path, variables };
    this.messages.push(message);
  }
}

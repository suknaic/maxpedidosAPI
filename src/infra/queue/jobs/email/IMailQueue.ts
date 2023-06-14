import {
  IMailProvider,
  IMailProviderRequest,
} from '@shared/providers/MailProvider/model/IMailProvider';
export abstract class IMailQueue implements IMailProvider {
  abstract sendMail(data: IMailProviderRequest): Promise<void>;
}

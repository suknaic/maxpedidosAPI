export interface IMailProviderRequest {
  to: string;
  subject: string;
  variables: any;
  path: string;
}

export abstract class IMailProvider {
  abstract sendMail({
    to,
    subject,
    variables,
    path,
  }: IMailProviderRequest): Promise<void>;
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IDateProvider } from '@shared/providers/DateProvider/model/IDateProvider';
import { IMailProvider } from '@shared/providers/MailProvider/model/IMailProvider';
import { randomUUID } from 'crypto';
import { resolve } from 'path';
import { RefreshTokenRepository } from '@application/repositories/RefreshTokenRepository';
import { UserRepository } from '@application/repositories/userRepository';
import { SendMailProducerService } from 'src/infra/queue/jobs/sendMail.producer.service';

@Injectable()
export class SendForgotPasswordMailService {
  constructor(
    private userRepository: UserRepository,
    private tokenRepository: RefreshTokenRepository,
    private dateProvider: IDateProvider,
    private sendMailQueue: SendMailProducerService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('Email not found!', HttpStatus.BAD_REQUEST);
    }

    const token = randomUUID();

    await this.tokenRepository.create({
      refreshToken: token,
      usuarioId: user.id,
      expiresIn: this.dateProvider.expiresInHours(3),
    });

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'views',
      'email',
      'forgotPassword.hbs',
    );

    const variables = {
      name: user.nome,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.sendMailQueue.sendMail({
      to: email,
      path: templatePath,
      variables,
      subject: 'Recuperação de Senha.',
    });
  }
}

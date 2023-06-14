import { RefreshTokenRepositoryInMemory } from '@application/repositories/in-memory/refreshTokenRepositoryInMemory';
import { SendForgotPasswordMailService } from './SendForgotPasswordMail.service';
import { UserRepositoryInMemory } from '@application/repositories/in-memory/userRepositoryInMemory';
import { DateProviderMock } from '@shared/providers/DateProvider/mock/DayjsDateProvider.mock';
import { MailProviderMock } from '@shared/providers/MailProvider/mock/MailProviderMock';
import { User } from '@application/entities/User';
import { HttpException } from '@nestjs/common';
import * as crypto from 'crypto';
import { IMailQueue } from 'src/infra/queue/jobs/email/IMailQueue';

describe('[SendForgotPasswordMailService]', () => {
  let sendForgotPasswordMailService: SendForgotPasswordMailService;
  let userRepository: UserRepositoryInMemory;
  let tokenRepository: RefreshTokenRepositoryInMemory;

  let dateProvider: DateProviderMock;
  let mailQueue: IMailQueue;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    tokenRepository = new RefreshTokenRepositoryInMemory();

    dateProvider = new DateProviderMock();
    mailQueue = new MailProviderMock();

    sendForgotPasswordMailService = new SendForgotPasswordMailService(
      userRepository,
      tokenRepository,
      dateProvider,
      mailQueue,
    );

    const userTest = new User({
      nome: 'user-test',
      contato: '00000-0000',
      email: 'test@email.com',
      senha: '12345',
    });
    userRepository.repository.push(userTest);
  });

  it('should be able to send mail for retrieve password', () => {
    expect(async () =>
      sendForgotPasswordMailService.execute('test@email.com'),
    ).toBeTruthy();
  });

  it('should be able to generate and save the token in the repository', async () => {
    const tokenMocked = jest
      .spyOn(crypto, 'randomUUID')
      .mockImplementation(() => 'mocked-token' as any);
    const repositoryCreateSpy = jest.spyOn(tokenRepository, 'create');

    await sendForgotPasswordMailService.execute('test@email.com');
    expect(tokenMocked).toHaveBeenCalled();
    expect(repositoryCreateSpy).toHaveBeenCalled();
    expect(tokenRepository.repository).toHaveLength(1);
    expect(tokenRepository.repository[0].refreshToken).toBe('mocked-token');
  });

  it('should trigger sendMail function', async () => {
    const senMailSpy = jest.spyOn(mailQueue, 'sendMail');
    await sendForgotPasswordMailService.execute('test@email.com');
    expect(senMailSpy).toHaveBeenCalled();
  });

  it('should not be able to send mail with email invalid', async () => {
    let error: Error;
    try {
      await sendForgotPasswordMailService.execute('invalid@email.com');
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(HttpException);
    expect(error.message).toBe('Email not found!');
  });
});

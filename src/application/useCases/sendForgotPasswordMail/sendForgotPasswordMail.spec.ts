import { RefreshTokenRepositoryInMemory } from '../../repositories/in-memory/refreshTokenRepositoryInMemory';
import { SendForgotPasswordMailService } from './SendForgotPasswordMail.service';
import { UserRepositoryInMemory } from '../../repositories/in-memory/userRepositoryInMemory';
import { DateProviderMock } from '@shared/providers/DateProvider/mock/DayjsDateProvider.mock';
import { MailProviderMock } from '@shared/providers/MailProvider/mock/MailProviderMock';
import { User } from '../../entities/User';
import { HttpException } from '@nestjs/common';
import * as crypto from 'crypto';

describe('[SendForgotPasswordMailService]', () => {
  let sendForgotPasswordMailService: SendForgotPasswordMailService;

  let userRepository: UserRepositoryInMemory;
  let tokenRepository: RefreshTokenRepositoryInMemory;

  let dateProvider: DateProviderMock;
  let mailProvider: MailProviderMock;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    tokenRepository = new RefreshTokenRepositoryInMemory();

    dateProvider = new DateProviderMock();
    mailProvider = new MailProviderMock();

    sendForgotPasswordMailService = new SendForgotPasswordMailService(
      userRepository,
      tokenRepository,
      dateProvider,
      mailProvider,
    );

    const userTest = new User({
      nome: 'user-test',
      contato: '00000-0000',
      email: 'test@email.com',
      senha: '12345',
    });
    userRepository.repository.push(userTest);
  });

  it('should be able to send mail for recuve password', () => {
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
    const senMailSpy = jest.spyOn(mailProvider, 'sendMail');
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
    expect(error.message).toBe('Email not found !');
  });
});

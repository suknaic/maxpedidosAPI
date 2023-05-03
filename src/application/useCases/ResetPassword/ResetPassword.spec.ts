import { UserRepositoryInMemory } from '../../repositories/in-memory/userRepositoryInMemory';
import { ResetPassword } from './ResetPassword.service';
import { RefreshTokenRepositoryInMemory } from '../../repositories/in-memory/refreshTokenRepositoryInMemory';
import { DateProviderMock } from '@shared/providers/DateProvider/mock/DayjsDateProvider.mock';
import { User } from '../../entities/User';
import { fail } from 'assert';
import { HttpException } from '@nestjs/common';

describe('[ResetPassword]', () => {
  let resetPasswordService: ResetPassword;
  let userRepository: UserRepositoryInMemory;
  let tokenRepository: RefreshTokenRepositoryInMemory;
  let dateProvider: DateProviderMock;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    tokenRepository = new RefreshTokenRepositoryInMemory();
    dateProvider = new DateProviderMock();

    resetPasswordService = new ResetPassword(
      userRepository,
      tokenRepository,
      dateProvider,
    );

    const userTest = new User({
      nome: 'user-test',
      contato: '99999-9999',
      email: 'test@email.com',
      senha: '54321',
    });

    userRepository.create(userTest);

    console.log(userRepository.repository);

    tokenRepository.create({
      usuarioId: userTest.id,
      refreshToken: 'reset-password-token',
      expiresIn: dateProvider.expiresInHours(2),
    });
  });

  it('should be able to reset the password', async () => {
    try {
      await resetPasswordService.execute({
        password: '00000',
        token: 'reset-password-token',
      });
      expect(true).toBe(true);
    } catch (error) {
      fail(error);
    }
  });

  it('should not be able to reset the password with token invalid', async () => {
    let Err: Error;
    try {
      await resetPasswordService.execute({
        password: '00000',
        token: 'invalid-password-token',
      });
      expect(true).toBe(true);
    } catch (error) {
      Err = error;
    }

    expect(Err).toBeInstanceOf(HttpException);
    expect(Err.message).toBe('token Invalid!');
  });

  it('should not be able to reset the password with token expired', async () => {
    tokenRepository.repository[0].expiresIn = dateProvider.expiresInHours(-1);

    let Err: Error;
    try {
      await resetPasswordService.execute({
        password: '00000',
        token: 'reset-password-token',
      });
      expect(true).toBe(true);
    } catch (error) {
      Err = error;
    }

    expect(Err).toBeInstanceOf(HttpException);
    expect(Err.message).toBe('Token Expires!');
  });
});

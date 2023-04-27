import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/User';
import { UserRepositoryInMemory } from '../../repositories/in-memory/userRepositoryInMemory';
import { AuthenticateService } from './authenticate.service';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { RefreshTokenRepositoryInMemory } from '../../repositories/in-memory/refreshTokenRepositoryInMemory';
import { DateProviderMock } from '@shared/providers/DateProvider/mock/DayjsDateProvider.mock';

describe('[AuthenticateService]', () => {
  let userInMemoryRepository: UserRepositoryInMemory;
  let refreshTokenRepository: RefreshTokenRepositoryInMemory;
  let jwtService: JwtService;
  let dateProvider: DateProviderMock;

  let authenticateService: AuthenticateService;

  beforeEach(async () => {
    userInMemoryRepository = new UserRepositoryInMemory();
    refreshTokenRepository = new RefreshTokenRepositoryInMemory();

    jwtService = {
      signAsync: jest
        .fn()
        .mockImplementationOnce(async () => 'mockedToken')
        .mockImplementationOnce(async () => 'mockedRefreshToken'),
    } as unknown as JwtService;

    dateProvider = new DateProviderMock();

    authenticateService = new AuthenticateService(
      userInMemoryRepository,
      refreshTokenRepository,
      jwtService,
      dateProvider,
    );

    const passwordHash = await bcrypt.hash('12345', 8);
    const userFake = new User({
      contato: '0000000000',
      email: 'email@test.com',
      nome: 'fake_user',
      senha: passwordHash,
    });

    userInMemoryRepository.create(userFake);
  });

  afterEach(() => {
    // bcryptCompareSpy.mockRestore();
  });

  it('should verify if password match', async () => {
    const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare');
    await authenticateService.execute({
      email: 'email@test.com',
      password: '12345',
    });
    expect(bcryptCompareSpy).toHaveBeenCalled();
  });

  it('should return a valid JWT Token', async () => {
    // bcryptCompareSpy.mockResolvedValue(true);
    const { token, refreshToken } = await authenticateService.execute({
      email: 'email@test.com',
      password: '12345',
    });

    expect(jwtService.signAsync).toHaveBeenCalled();

    expect(token).toBe('mockedToken');
    expect(typeof token).toEqual('string');

    expect(refreshToken).toBe('mockedRefreshToken');
    expect(typeof refreshToken).toEqual('string');
  });

  it('should not be authenticate a user nonexistent', async () => {
    expect(async () => {
      await authenticateService.execute({
        email: 'FailEmail@test.com',
        password: '12345',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
  it('should not be authenticate a user with password incorrect', async () => {
    expect(async () => {
      await authenticateService.execute({
        email: 'email@test.com',
        password: 'invalid-password',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
});

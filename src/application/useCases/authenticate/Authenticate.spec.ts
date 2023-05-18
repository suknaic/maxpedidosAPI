import { User } from '@application/entities/User';
import { UserRepositoryInMemory } from '@application/repositories/in-memory/userRepositoryInMemory';
import { AuthenticateService } from './authenticate.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { RefreshTokenRepositoryInMemory } from '@application/repositories/in-memory/refreshTokenRepositoryInMemory';
import { ITokensProvider } from '@shared/providers/JwtProvider/model/generateTokensProvider';

describe('[AuthenticateService]', () => {
  let userInMemoryRepository: UserRepositoryInMemory;
  let refreshTokenRepository: RefreshTokenRepositoryInMemory;
  let jwtService: ITokensProvider;

  let authenticateService: AuthenticateService;

  beforeEach(async () => {
    userInMemoryRepository = new UserRepositoryInMemory();
    refreshTokenRepository = new RefreshTokenRepositoryInMemory();

    jwtService = {
      generateToken: jest.fn(async () => 'mockedToken'),
      generateRefreshToken: jest.fn(async () => {
        return {
          usuarioId: 'id-mocked',
          refreshToken: 'mockedRefreshToken',
          expiresIn: 'data-mocked',
        };
      }),
    } as unknown as ITokensProvider;

    authenticateService = new AuthenticateService(
      userInMemoryRepository,
      refreshTokenRepository,
      jwtService,
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

  it('should trigger function compare ', async () => {
    const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare');
    await authenticateService.execute({
      email: 'email@test.com',
      password: '12345',
    });
    expect(bcryptCompareSpy).toHaveBeenCalled();
  });

  it('should be able to verify if password match', async () => {
    expect(async () => {
      await authenticateService.execute({
        email: 'email@test.com',
        password: '12345',
      });
    }).toBeTruthy();
  });

  it('should throw an UnauthorizedException if the password is incorrect', async () => {
    expect(async () => {
      await authenticateService.execute({
        email: 'email@test.com',
        password: 'invalid-password',
      });
    }).rejects.toThrow(UnauthorizedException);
  });

  it('should return a valid JWT Token and refreshToken', async () => {
    const { token, refreshToken } = await authenticateService.execute({
      email: 'email@test.com',
      password: '12345',
    });

    expect(jwtService.generateToken).toHaveBeenCalled();
    expect(jwtService.generateRefreshToken).toHaveBeenCalled();

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
    }).rejects.toBeInstanceOf(UnauthorizedException);
  });
});

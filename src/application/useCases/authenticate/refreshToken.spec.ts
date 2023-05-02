import { ITokensProvider } from '@shared/providers/JwtProvider/model/generateTokensProvider';
import { RefreshTokenRepositoryInMemory } from '../../repositories/in-memory/refreshTokenRepositoryInMemory';
import { DateProviderMock } from '@shared/providers/DateProvider/mock/DayjsDateProvider.mock';
import { RefreshTokenService } from './refreshtoken.service';
import { UnauthorizedException } from '@nestjs/common';

describe('[RefreshTokenService]', () => {
  let refreshTokenService: RefreshTokenService;
  let tokenRepository: RefreshTokenRepositoryInMemory;
  let jwtService: ITokensProvider;
  let dateProvider: DateProviderMock;

  beforeEach(() => {
    tokenRepository = new RefreshTokenRepositoryInMemory();
    dateProvider = new DateProviderMock();
    jwtService = {
      generateToken: jest.fn(async () => 'mockedToken'),
      generateRefreshToken: jest.fn(async () => {
        return {
          usuarioId: 'id-mocked',
          refreshToken: 'mockedRefreshToken',
          expiresIn: 'data-mocked',
        };
      }),
      verifyRefreshToken: jest.fn(async () => {
        return { email: 'mocked@user.com', sub: 'id-mocked' };
      }),
    } as unknown as ITokensProvider;

    refreshTokenService = new RefreshTokenService(
      tokenRepository,
      jwtService,
      dateProvider,
    );

    tokenRepository.repository[0] = {
      id: 'mockedId',
      expiresIn: dateProvider.expiresInHours(3),
      refreshToken: 'mockedRefreshToken',
      usuarioId: 'id-mocked',
    };
  });

  it('should be able to receive valid tokens', async () => {
    const { token, refresh_token } = await refreshTokenService.execute(
      'mockedRefreshToken',
    );

    expect(typeof refresh_token).toBe('string');
    expect(refresh_token).toBe('mockedRefreshToken');

    expect(typeof token).toBe('string');
    expect(token).toBe('mockedToken');

    expect(tokenRepository.repository).toHaveLength(1);
  });

  it('should not be received tokens with refreshToken invalid', async () => {
    let error: Error;
    try {
      await refreshTokenService.execute('invalidRefreshToken');
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(UnauthorizedException);
    expect(error.message).toBe('token does not exists');
  });

  it('should not be received tokens with refreshToken date invalid', async () => {
    let error: Error;
    const tokenDeleteSpy = jest.spyOn(tokenRepository, 'deleteById');
    try {
      tokenRepository.repository[0].expiresIn = dateProvider.expiresInHours(-2);
      await refreshTokenService.execute('mockedRefreshToken');
    } catch (e) {
      error = e;
    }
    expect(tokenDeleteSpy).toBeCalled();
    expect(tokenRepository.repository).toHaveLength(0);
    expect(error).toBeInstanceOf(UnauthorizedException);
    expect(error.message).toBe('token Expired');
  });
});

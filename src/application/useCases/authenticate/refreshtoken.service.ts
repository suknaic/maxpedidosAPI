import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenRepository } from '@application/repositories/RefreshTokenRepository';
import { IDateProvider } from '@shared/providers/DateProvider/model/IDateProvider';
import { ITokensProvider } from '@shared/providers/JwtProvider/model/generateTokensProvider';

type IRefreshTokenResponse = {
  token: string;
  refreshToken: string;
};

@Injectable()
export class RefreshTokenService {
  constructor(
    private tokenRepository: RefreshTokenRepository,
    private jwtService: ITokensProvider,
    private dateProvider: IDateProvider,
  ) {}

  async execute(refresh_token: string): Promise<IRefreshTokenResponse> {
    const { email, sub } = await this.jwtService.verifyRefreshToken(
      refresh_token,
    );

    const userRefreshToken =
      await this.tokenRepository.findUserIdAndRefreshToken(sub, refresh_token);

    if (!userRefreshToken) {
      throw new UnauthorizedException('token does not exists');
    }

    const refreshTokenExpired = this.dateProvider.dateIsValid(
      userRefreshToken.expiresIn,
    );

    if (refreshTokenExpired) {
      await this.tokenRepository.deleteById(userRefreshToken.id);
      throw new UnauthorizedException('token Expired');
    }

    const token = await this.jwtService.generateToken(sub);

    await this.tokenRepository.deleteById(userRefreshToken.id);

    const { usuarioId, refreshToken, expiresIn } =
      await this.jwtService.generateRefreshToken({ email, usuarioId: sub });

    await this.tokenRepository.create({
      usuarioId,
      refreshToken,
      expiresIn,
    });
    return { token, refreshToken };
  }
}

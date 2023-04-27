import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenRepository } from '../../repositories/RefreshTokenRepository';
import { IDateProvider } from '@shared/providers/DateProvider/model/IDateProvider';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/infra/config/auth';

interface IRefreshTokenResponse {
  token: string;
  refresh_token: string;
}

@Injectable()
export class RefreshTokenService {
  constructor(
    private refreshTokenRepository: RefreshTokenRepository,
    private jwtService: JwtService,
    private dateProvider: IDateProvider,
  ) {}

  async execute(refreshToken: string): Promise<IRefreshTokenResponse> {
    const { email, sub } = await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstants.secret_refreshtoken,
    });

    const userRefreshToken =
      await this.refreshTokenRepository.findUserIdAndRefreshToken(
        sub,
        refreshToken,
      );

    if (!userRefreshToken) {
      throw new UnauthorizedException('token does not exists');
    }

    const refreshTokenExpired = this.dateProvider.dateIsValid(
      userRefreshToken.expiresIn,
    );

    if (refreshTokenExpired) {
      await this.refreshTokenRepository.deleteById(userRefreshToken.id);
      throw new UnauthorizedException('token Expired');
    }

    // cria o token de acesso
    const token = this.jwtService.sign(
      {},
      {
        subject: `${sub}`,
        secret: jwtConstants.secret_token,
        expiresIn: jwtConstants.expires_in_token,
      },
    );

    //cria o token de atualização
    await this.refreshTokenRepository.deleteById(userRefreshToken.id);
    const refresh_token = await this.jwtService.signAsync(
      { email },
      {
        subject: `${sub}`,
        secret: jwtConstants.secret_refreshtoken,
        expiresIn: jwtConstants.expires_in_refreshToken,
      },
    );
    const expires_date = this.dateProvider.expiresInDay(
      jwtConstants.expires_refreshToken_day,
    );
    await this.refreshTokenRepository.create({
      usuarioId: `${sub}`,
      refreshToken: refresh_token,
      expiresIn: expires_date,
    });

    // retorna os tokens
    return { token, refresh_token };
  }
}

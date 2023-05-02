import { Injectable } from '@nestjs/common';
import { ITokensProvider } from '../model/generateTokensProvider';
import { JwtService } from '@nestjs/jwt';
import { IDateProvider } from '@shared/providers/DateProvider/model/IDateProvider';

interface IPayloadToken {
  sub: string;
}

interface IPayloadRefreshToken extends IPayloadToken {
  email: string;
}

@Injectable()
export class JwtTokenProvider implements ITokensProvider {
  constructor(
    private jwtService: JwtService,
    private dateProvider: IDateProvider,
  ) {}

  async refreshTokenDateIsValid(number: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async verifyRefreshToken(
    refreshtoken: string,
  ): Promise<{ sub: string; email: string }> {
    const { email, sub } = (await this.jwtService.verifyAsync(refreshtoken, {
      secret: process.env.SECRET_REFRESH_TOKEN,
    })) as IPayloadRefreshToken;

    return { email, sub };
  }

  async generateRefreshToken({
    usuarioId,
    email,
  }: {
    usuarioId: string;
    email: string;
  }): Promise<{ usuarioId: string; refreshToken: string; expiresIn: number }> {
    const refreshToken = await this.jwtService.signAsync(
      { email },
      {
        subject: usuarioId,
        secret: process.env.SECRET_REFRESH_TOKEN,
        expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
      },
    );

    const expiresIn = this.dateProvider.expiresInDay(
      Number(process.env.EXPIRES_DAY_REFRESH_TOKEN),
    );

    return {
      refreshToken,
      usuarioId,
      expiresIn,
    };
  }

  async generateToken(usuarioId: string): Promise<string> {
    return this.jwtService.signAsync(
      {},
      {
        subject: usuarioId,
        secret: process.env.SECRET_TOKEN,
        expiresIn: process.env.EXPIRES_IN_TOKEN,
      },
    );
  }

  async verifyToken(token: string): Promise<string> {
    const { sub } = (await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_TOKEN,
    })) as IPayloadToken;

    return sub;
  }
}

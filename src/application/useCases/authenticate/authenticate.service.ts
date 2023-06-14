import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from '@application/repositories/userRepository';
import { RefreshTokenRepository } from '@application/repositories/RefreshTokenRepository';
import { ITokensProvider } from '@shared/providers/JwtProvider/model/generateTokensProvider';

type IAuthenticateRequest = {
  email: string;
  password: string;
};

type IAuthenticateResponse = {
  token: string;
  refreshToken: string;
};

@Injectable()
export class AuthenticateService {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository,
    private jwtService: ITokensProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'Ops, não encontramos seu email ou senha.',
      );
    }
    const passwordMatch = await compare(password, user.senha);
    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Ops, não encontramos seu email ou senha.',
      );
    }
    const token = await this.jwtService.generateToken(user.id);
    await this.refreshTokenRepository.deleteManyByUserId(user.id);

    const { expiresIn, refreshToken, usuarioId } =
      await this.jwtService.generateRefreshToken({
        email,
        usuarioId: user.id,
      });

    await this.refreshTokenRepository.create({
      expiresIn,
      refreshToken,
      usuarioId,
    });

    //retorna os tokens
    return { token, refreshToken };
  }
}

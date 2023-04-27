import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserRepository } from '../../repositories/userRepository';
import { RefreshTokenRepository } from '../../repositories/RefreshTokenRepository';
import { IDateProvider } from '@shared/providers/DateProvider/model/IDateProvider';
import { jwtConstants } from '../../../infra/config/auth';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

interface IAuthenticateResponse {
  token: string;
  refreshToken: string;
}

@Injectable()
export class AuthenticateService {
  constructor(
    private userRepository: UserRepository,
    private refresTokenRepository: RefreshTokenRepository,
    private jwtService: JwtService,
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    // verifica e valida o usuário
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

    //cria o token de acesso

    const token = await this.jwtService.signAsync(
      {},
      {
        subject: user.id,
        secret: jwtConstants.secret_token,
        expiresIn: jwtConstants.expires_in_token,
      },
    );

    // cria o token de atualização
    await this.refresTokenRepository.deleteByUserId(user.id);
    const refreshToken = await this.jwtService.signAsync(
      { email },
      {
        subject: user.id,
        secret: jwtConstants.secret_refreshtoken,
        expiresIn: jwtConstants.expires_in_refreshToken,
      },
    );

    const expiresIn = this.dateProvider.expiresInDay(
      jwtConstants.expires_refreshToken_day,
    );

    await this.refresTokenRepository.create({
      usuarioId: user.id,
      refreshToken,
      expiresIn,
    });

    //retorna os tokens
    return { token, refreshToken };
  }
}

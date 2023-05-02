import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from '../../repositories/userRepository';
import { RefreshTokenRepository } from '../../repositories/RefreshTokenRepository';
import { ITokensProvider } from '@shared/providers/JwtProvider/model/generateTokensProvider';

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
    private jwtService: ITokensProvider,
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

    const token = await this.jwtService.generateToken(user.id);

    // cria o token de atualização
    await this.refresTokenRepository.deleteByUserId(user.id);

    const { usuarioId, refreshToken, expiresIn } =
      await this.jwtService.generateRefreshToken({
        email,
        usuarioId: user.id,
      });

    await this.refresTokenRepository.create({
      usuarioId,
      refreshToken,
      expiresIn,
    });

    //retorna os tokens
    return { token, refreshToken };
  }
}

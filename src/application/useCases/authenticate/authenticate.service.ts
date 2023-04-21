import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserRepository } from '../../repositories/userRepository';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

interface IAuthenticateResponse {
  token: string;
}

@Injectable()
export class AuthenticateService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
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

    const token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.nome,
    });

    return { token };
  }
}

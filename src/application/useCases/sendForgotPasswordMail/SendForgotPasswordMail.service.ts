import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IDateProvider } from '@shared/providers/DateProvider/model/IDateProvider';
import { randomUUID } from 'crypto';
import { RefreshTokenRepository } from 'src/application/repositories/RefreshTokenRepository';
import { UserRepository } from 'src/application/repositories/userRepository';

@Injectable()
export class SendForgotPasswordMailService {
  constructor(
    private userRespository: UserRepository,
    private tokenRepository: RefreshTokenRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRespository.findByEmail(email);

    if (!user) {
      throw new HttpException('Email not found !', HttpStatus.BAD_REQUEST);
    }

    const token = randomUUID();

    await this.tokenRepository.create({
      refreshToken: token,
      usuarioId: user.id,
      expiresIn: this.dateProvider.expiresInHours(3),
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IDateProvider } from '@shared/providers/DateProvider/model/IDateProvider';
import { RefreshTokenRepository } from '@application/repositories/RefreshTokenRepository';
import { UserRepository } from '@application/repositories/userRepository';
import { hash } from 'bcrypt';

type IResetPasswordRequest = {
  password: string;
  token: string;
};

@Injectable()
export class ResetPassword {
  constructor(
    private userRepository: UserRepository,
    private tokenRepository: RefreshTokenRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute({ password, token }: IResetPasswordRequest): Promise<void> {
    const tokenResetPassword = await this.tokenRepository.findByRefreshToken(
      token,
    );

    if (!tokenResetPassword) {
      throw new HttpException('token Invalid!', HttpStatus.BAD_REQUEST);
    }

    const dateExpired = this.dateProvider.dateIsValid(
      tokenResetPassword.expiresIn,
    );

    if (dateExpired) {
      throw new HttpException('Token Expires!', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findById(
      tokenResetPassword.usuarioId,
    );

    user.senha = await hash(password, 8);

    await this.userRepository.create(user);
    await this.tokenRepository.deleteById(tokenResetPassword.id);
  }
}

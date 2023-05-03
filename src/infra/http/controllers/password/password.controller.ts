import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AuthenticateService } from '@usecases/authenticate/authenticate.service';
import { Public } from '../../guards/decorator/auth.decorator';
import { RefreshTokenService } from '@usecases/authenticate/refreshtoken.service';
import { SendForgotPasswordMailService } from '@usecases/sendForgotPasswordMail/SendForgotPasswordMail.service';
import { ForgotPasswordDTO } from '../../dtos/forgotPasswordDTO';
import { ResetPassword } from '@usecases/ResetPassword/ResetPassword.service';

@Controller()
export class PasswordController {
  constructor(
    private sendForgotMailPassword: SendForgotPasswordMailService,
    private resetPasswordService: ResetPassword,
  ) {}

  @Public()
  @Post('forgot')
  @HttpCode(200)
  async mailForgotPassword(@Body() { email }: ForgotPasswordDTO) {
    await this.sendForgotMailPassword.execute(email);
  }

  @Public()
  @Post('reset')
  @HttpCode(201)
  async resetPassword(
    @Query('token') token: string,
    @Body('password') password: string,
  ) {
    await this.resetPasswordService.execute({
      token,
      password,
    });
  }
}

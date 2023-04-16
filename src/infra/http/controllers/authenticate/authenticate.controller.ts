import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticateService } from '@usecases/authenticate/authenticate.service';
import { Response } from 'express';
import { signInDTO } from '../../dtos/signInDTO';
import { Public } from '../../guards/decorator/auth.decorator';

@Controller()
export class AuthenticateController {
  constructor(private authenticateService: AuthenticateService) {}
  @Public()
  @Post('login')
  async signIn(
    @Res() response: Response,
    @Body() { email, password }: signInDTO,
  ) {
    const { token } = await this.authenticateService.execute({
      email,
      password,
    });

    return response.status(HttpStatus.OK).json(token);
  }
}

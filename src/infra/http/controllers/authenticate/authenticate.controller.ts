import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthenticateService } from '@usecases/authenticate/authenticate.service';
import { Request, Response } from 'express';
import { signInDTO } from '../../dtos/signInDTO';
import { Public } from '../../guards/decorator/auth.decorator';
import { RefreshTokenService } from '@usecases/authenticate/refreshtoken.service';

@Controller()
export class AuthenticateController {
  constructor(
    private authenticateService: AuthenticateService,
    private refreshTokenService: RefreshTokenService,
  ) {}
  @Public()
  @Post('login')
  async signIn(
    @Res() response: Response,
    @Body() { email, password }: signInDTO,
  ) {
    const { token, refreshToken } = await this.authenticateService.execute({
      email,
      password,
    });

    return response.status(HttpStatus.OK).json({ token, refreshToken });
  }

  @Public()
  @Post('refresh-token')
  async refresh(@Req() request: Request, @Res() response: Response) {
    const refreshToken =
      request.body.refreshToken || request.query.refreshtoken;

    const { token, refresh_token } = await this.refreshTokenService.execute(
      refreshToken,
    );

    return response.status(201).json({
      token,
      refresh_token,
    });
  }
}

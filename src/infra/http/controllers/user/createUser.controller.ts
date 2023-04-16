import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserService } from '@usecases/user/createUser.service';
import { Response } from 'express';
import { userDTO } from '../../dtos/userDTO';
import { Public } from '../../guards/decorator/auth.decorator';
import { UserMapperView } from '../../mappers-view/user-mapper-view';

@Controller()
export class CreateUserController {
  constructor(private readonly userService: CreateUserService) {}
  @Public()
  @Post('/cadastro')
  async create(
    @Res() response: Response,
    @Body() { nome, email, contato, senha }: userDTO,
  ) {
    const { user } = await this.userService.execute({
      nome,
      email,
      contato,
      senha,
    });

    const userMapperView = UserMapperView.toHTTP(user);

    return response.status(HttpStatus.CREATED).json(userMapperView);
  }
}

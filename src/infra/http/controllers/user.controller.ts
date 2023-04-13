import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '@usecases/user/CreateUser.service';
import { userDTO } from '../dtos/userDTO';
import { UserMapperView } from '../mappers-view/user-mapper-view';

@Controller('user')
export class UserController {
  constructor(private readonly userService: CreateUserService) {}

  @Post()
  async create(@Body() { nome, email, contato, senha }: userDTO) {
    const { usuario } = await this.userService.execute({
      nome,
      email,
      contato,
      senha,
    });

    return UserMapperView.toHTTP(usuario);
  }
}

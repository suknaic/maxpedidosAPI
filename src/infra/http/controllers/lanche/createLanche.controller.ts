import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateLancheService } from '@usecases/lanche/createLanche.service';
import { Request } from 'express';
import { lancheDTO } from '../../dtos/lancheDTO';

@Controller()
export class CreateLancheController {
  constructor(private lancheService: CreateLancheService) {}

  @Post('/lanche')
  async create(
    @Req() { user }: Request,
    @Body() { logo = null, nome, contato }: lancheDTO,
  ) {
    const { id } = user;

    await this.lancheService.execute({
      logo,
      nome,
      contato,
      usuarioId: id,
    });
  }
}
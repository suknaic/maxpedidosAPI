import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateLancheService } from '@usecases/lanche/createLanche.service';
import { Request } from 'express';
import { lancheDTO } from '../../dtos/lancheDTO';
import { CreateCardapioService } from '@usecases/cardapio/createCardapio.service';

@Controller()
export class CreateLancheController {
  constructor(
    private lancheService: CreateLancheService,
    private cardapioService: CreateCardapioService,
  ) {}

  @Post('/cadastro/lanche')
  async create(
    @Req() { user }: Request,
    @Body()
    { logo = null, nome, horaAbre, horaFecha, diasAbre, contato }: lancheDTO,
  ) {
    const { id } = user;

    const { lanche } = await this.lancheService.execute({
      logo,
      nome,
      contato,
      horaAbre,
      horaFecha,
      diasAbre,
      usuarioId: id,
    });

    await this.cardapioService.execute(lanche.id);
  }
}

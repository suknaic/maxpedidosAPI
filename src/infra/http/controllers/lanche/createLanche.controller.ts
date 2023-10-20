import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCardapioService } from '@usecases/cardapio/createCardapio.service';
import { CreateLancheService } from '@usecases/lanche/createLanche.service';
import { Request } from 'express';
import { lancheDTO } from '../../dtos/lancheDTO';

@Controller()
export class CreateLancheController {
  constructor(
    private lancheService: CreateLancheService,
    private cardapioService: CreateCardapioService,
  ) {}

  @Post('cadastro/lanche')
  @UseInterceptors(FileInterceptor('logo'))
  async create(
    @Req() { user }: Request,
    @Body()
    { nome, horaAbre, horaFecha, diasAbre, contato }: lancheDTO,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    const { id } = user;
    console.log(logo);
    console.log({ nome, horaAbre, horaFecha, diasAbre, contato });
    // const { lanche } = await this.lancheService.execute({
    //   nome,
    //   contato,
    //   horaAbre,
    //   horaFecha,
    //   diasAbre,
    //   usuarioId: id,
    // });

    // await this.cardapioService.execute(lanche.id);
  }
}

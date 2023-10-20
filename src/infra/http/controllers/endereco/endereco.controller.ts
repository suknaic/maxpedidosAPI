import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateEnderecoService } from '@usecases/endereco/createEndereco.service';
import { Request } from 'express';
import { EnderecoDTO } from '../../dtos/enderecoDTO';

@Controller()
export class EnderecoController {
  constructor(private createEnderecoService: CreateEnderecoService) {}

  @Post('/cadastro/endereco')
  async create(
    @Req() { user }: Request,
    @Body()
    {
      logradouro,
      numero,
      complemento,
      cidade,
      estado,
      cep,
      long,
      lat,
    }: EnderecoDTO,
  ) {
    const { id } = user;
    await this.createEnderecoService.execute({
      logradouro,
      numero,
      complemento,
      cidade,
      estado,
      cep,
      long,
      lat,
      userId: id,
    });
  }
}

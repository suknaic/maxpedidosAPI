import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnderecoRepository } from '../../repositories/enderecoRepository';
import { Endereco } from '../../entities/Endereco';
import { LancheRepository } from '../../repositories/lancheRepository';

type IEnderecoRequest = {
  logradouro: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;

  userId: string;
};

@Injectable()
export class CreateEnderecoService {
  constructor(
    private enderecoRepository: EnderecoRepository,
    private lancheRepository: LancheRepository,
  ) {}

  async execute({
    logradouro,
    numero,
    complemento,
    cidade,
    estado,
    cep,
    userId,
  }: IEnderecoRequest) {
    const lanche = await this.lancheRepository.findLanche(userId);

    if (!lanche) {
      throw new HttpException('lanche Não encontrado', HttpStatus.BAD_REQUEST);
    }

    const endereco = new Endereco({
      logradouro,
      numero,
      complemento,
      cidade,
      estado,
      cep,
      lancheId: lanche.id,
    });

    await this.enderecoRepository.create(endereco);
  }
}

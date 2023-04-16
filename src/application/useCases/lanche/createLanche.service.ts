import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/userRepository';
import { Lanche } from '../../entities/Lanche';
import { LancheRepository } from '../../repositories/lancheRepository';

interface ILancheRequest {
  logo?: string | null;
  nome: string;
  contato: string;
  usuarioId: string;
}

interface ILancheResponse {
  lanche: Lanche;
}

@Injectable()
export class CreateLancheService {
  constructor(
    private lancheRepository: LancheRepository,
    private userRepository: UserRepository,
  ) {}

  public async execute({
    logo,
    nome,
    contato,
    usuarioId,
  }: ILancheRequest): Promise<ILancheResponse> {
    const user = await this.userRepository.findById(usuarioId);

    if (!user) {
      throw new HttpException(
        'Usuário não encontrado ',
        HttpStatus.BAD_REQUEST,
      );
    }

    const lanche = new Lanche({
      _logo: logo,
      nome,
      contato,
      usuarioId,
    });
    await this.lancheRepository.create(lanche);

    return { lanche };
  }
}

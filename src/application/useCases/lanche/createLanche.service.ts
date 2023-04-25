import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/userRepository';
import { Lanche } from '../../entities/Lanche';
import { LancheRepository } from '../../repositories/lancheRepository';
import { IDateProvider } from '@shared/providers/DateProvider/model/IDateProvider';

interface ILancheRequest {
  logo?: string | null;
  nome: string;
  contato: string;
  horaAbre: string;
  horaFecha: string;
  diasAbre: string[];
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
    private dateProvider: IDateProvider,
  ) {}

  public async execute({
    logo,
    nome,
    contato,
    horaAbre,
    horaFecha,
    diasAbre,
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

      horaAbre: this.dateProvider.addHours(horaAbre),
      horaFecha: this.dateProvider.addHours(horaFecha),
      diasAbre,
      usuarioId,
    });

    await this.lancheRepository.create(lanche);

    return { lanche };
  }
}

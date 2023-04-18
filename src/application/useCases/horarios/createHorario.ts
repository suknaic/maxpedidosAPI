import { DIA_DA_SEMANA } from '@helpers/diaDaSemana';
import { Injectable } from '@nestjs/common';
import { IDateProvider } from '@shared/providers/DateProvider/model/IDateProvider';
import { makeHorario } from '../../factories/horarioFactory';
import { HorarioRepository } from '../../repositories/horarioRepository';

export interface IHorarioRequest {
  diaSemana: string;
  disponivel: boolean;
  horaAbre: string;
  horaFecha: string;

  lancheId: string;
}

@Injectable()
export class CreateHorarioService {
  constructor(
    private horarioRepository: HorarioRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute(horarios: IHorarioRequest[]): Promise<void> {
    try {
      const horarioFuncionamento = horarios.map((horario) =>
        makeHorario({
          ...horario,
          diaSemana: DIA_DA_SEMANA[horario.diaSemana],
          horaAbre: this.dateProvider.addHours(horario.horaAbre),
          horaFecha: this.dateProvider.addHours(horario.horaFecha),
        }),
      );
      await this.horarioRepository.createMany(horarioFuncionamento);
    } catch (error) {
      throw new Error(error);
    }
  }
}

import { Horario } from '../../entities/Horario';
import { HorarioRepository } from '../horarioRepository';

export class HorarioRepositoryInMemory implements HorarioRepository {
  public repository: Horario[];

  constructor() {
    this.repository = [];
  }

  async createMany(horario: Horario[]): Promise<void> {
    horario.forEach((diaSemana) => this.repository.push(diaSemana));
    console.log(this.repository);
  }
}

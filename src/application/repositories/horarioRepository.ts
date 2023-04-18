import { Horario } from '../entities/Horario';

export abstract class HorarioRepository {
  abstract createMany(horario: Horario[]): Promise<void>;
}

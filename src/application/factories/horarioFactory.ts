import { Horario, HorarioProps } from '../entities/Horario';

type Override = Partial<HorarioProps>;

export function makeHorario(override: Override = {}) {
  return new Horario({ ...(override as HorarioProps) });
}

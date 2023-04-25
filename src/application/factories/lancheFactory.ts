import { Lanche, LancheProps } from '../entities/Lanche';

type Override = Partial<LancheProps>;

export function makeLanche(override: Override = {}) {
  return new Lanche({ ...(override as LancheProps) });
}

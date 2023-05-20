import { Lanche } from '../entities/Lanche';

export abstract class LancheRepository {
  abstract create(lanche: Lanche): Promise<void>;
  abstract findById(id: string): Promise<Lanche>;
  abstract findLancheByUserId(userId: string): Promise<Lanche>;
  abstract findCardapioOfLancheByUserId(userId: string): Promise<Lanche>;
}

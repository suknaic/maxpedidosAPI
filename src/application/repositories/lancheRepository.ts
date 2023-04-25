import { Lanche } from '../entities/Lanche';

export abstract class LancheRepository {
  abstract create(lanche: Lanche): Promise<void>;
  abstract findById(id: string): Promise<Lanche>;
  abstract findLanche(userId: string): Promise<Lanche>;
}

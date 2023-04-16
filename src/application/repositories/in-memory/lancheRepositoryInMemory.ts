import { Lanche } from '../../entities/Lanche';
import { LancheRepository } from '../lancheRepository';

export class LancheRepositoryInMemory implements LancheRepository {
  public repository: Lanche[];

  constructor() {
    this.repository = [];
  }

  async create(lanche: Lanche): Promise<void> {
    this.repository.push(lanche);
  }

  async findById(id: string): Promise<Lanche> {
    const lanche = this.repository.find((lanche) => lanche.id === id);
    return lanche;
  }
}

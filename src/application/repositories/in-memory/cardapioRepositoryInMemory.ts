import { Cardapio } from 'src/application/entities/Cardapio';
import { CardapioRepository } from '../CardapioRepository';

export class CardapioRepositoryInMemory implements CardapioRepository {
  public repository: Cardapio[];

  constructor() {
    this.repository = [];
  }

  async create(cardapio: Cardapio): Promise<void> {
    this.repository.push(cardapio);
  }
}

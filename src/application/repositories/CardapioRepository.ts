import { Cardapio } from '../entities/Cardapio';

export abstract class CardapioRepository {
  abstract create(cardapio: Cardapio): Promise<void>;
  abstract findById(cardapioID: string): Promise<Cardapio>;
}

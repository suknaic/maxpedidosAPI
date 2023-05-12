import { Cardapio } from 'src/application/entities/Cardapio';

export class PrismaCardapioMapper {
  static toPrisma(cardapio: Cardapio) {
    return {
      id: cardapio.id,
      categorias: cardapio.categorias,
      lancheId: cardapio.lancheId,
    };
  }
}

import { Categoria } from '@application/entities/Categoria';

export class PrismaCategoryMapper {
  static toPrisma(category: Categoria) {
    return {
      id: category.id,
      nome: category.nome,
      cardapioId: category.cardapioId,
    };
  }
}

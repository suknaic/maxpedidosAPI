import { Categoria } from '../entities/Categoria';

type findCategoryProps = {
  categoryName: string;
  cardapioId: string;
};

export abstract class CategoryRepository {
  abstract create(category: Categoria): Promise<void>;
  abstract findByName({
    cardapioId,
    categoryName,
  }: findCategoryProps): Promise<Categoria>;
  abstract getAllByUser(cardapioId: string): Promise<Categoria[]>;
}

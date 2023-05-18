import { Categoria } from '../entities/Categoria';

export abstract class CategoryRepository {
  abstract create(category: Categoria): Promise<void>;
  abstract findByName(categoryName: string): Promise<Categoria>;
}

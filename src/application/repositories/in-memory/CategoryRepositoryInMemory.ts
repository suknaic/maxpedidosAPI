import { Categoria } from 'src/application/entities/Categoria';
import { CategoryRepository } from '../CategoryRepository';

export class CategoryRepositoryInMemory implements CategoryRepository {
  public repository: Categoria[];

  constructor() {
    this.repository = [];
  }

  async create(categoria: Categoria): Promise<void> {
    this.repository.push(categoria);
  }

  async findByName(categoryName: string): Promise<Categoria> {
    const categoria = this.repository.find(
      (category) => category.name === categoryName,
    );

    return categoria;
  }
}

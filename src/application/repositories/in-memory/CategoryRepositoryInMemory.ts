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

  async findByName({ categoryName, cardapioId }): Promise<Categoria> {
    const categoria = this.repository.find(
      (category) =>
        category.nome === categoryName && category.cardapioId === cardapioId,
    );
    return categoria;
  }

  async getAllByUser(cardapioId: string): Promise<Categoria[]> {
    const categorias = this.repository.filter(
      (category) => category.cardapioId === cardapioId,
    );

    return categorias;
  }
}

import { Categoria } from 'src/application/entities/Categoria';
import { CategoryRepository, updateCategoryProps } from '../CategoryRepository';

export class CategoryRepositoryInMemory implements CategoryRepository {
  public repository: Categoria[];

  constructor() {
    this.repository = [];
  }
  async updateCategory({
    categoryId,
    categoryName,
    categoryIcon,
  }: updateCategoryProps): Promise<Categoria> {
    const index = this.repository.findIndex(
      (category) => category.id === categoryId,
    );
    this.repository[index].nome = categoryName;
    this.repository[index].icon = categoryIcon;

    return this.repository[index];
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

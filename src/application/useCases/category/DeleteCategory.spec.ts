import { CategoryRepositoryInMemory } from '@application/repositories/in-memory/CategoryRepositoryInMemory';
import { DeleteCategory } from './DeleteCategory.service';
import { Categoria } from '../../entities/Categoria';

describe('[DeleteCategoryService]', () => {
  let deleteCategoryService: DeleteCategory;
  let categoryRepository: CategoryRepositoryInMemory;
  let categorias: Categoria[];

  beforeEach(() => {
    categoryRepository = new CategoryRepositoryInMemory();
    deleteCategoryService = new DeleteCategory(categoryRepository);

    categorias = [];

    const sanduiche = new Categoria({
      cardapioId: 'mocked-lanche-id',
      icon: 'icon-san',
      nome: 'sanduiches',
    });
    const hamburguer = new Categoria({
      cardapioId: 'mocked-lanche-id',
      icon: 'icon-bur',
      nome: 'hamburguer',
    });
    categoryRepository.create(sanduiche);
    categoryRepository.create(hamburguer);
    categorias.push(sanduiche);
    categorias.push(hamburguer);
  });

  it('should be able to delete a category existing', async () => {
    await deleteCategoryService.execute(categorias[0].id);
    expect(categoryRepository.repository).toHaveLength(1);
  });
});

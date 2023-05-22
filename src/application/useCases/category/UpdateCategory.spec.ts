import { CategoryRepositoryInMemory } from '@application/repositories/in-memory/CategoryRepositoryInMemory';
import { makeLanche } from '@application/factories/lancheFactory';
import { Cardapio } from '@application/entities/Cardapio';
import { Categoria } from '@application/entities/Categoria';
import { UpdateCategory } from './UpdateCategory.service';

describe('[UpdateCategoryService]', () => {
  let updateCategoryService: UpdateCategory;
  let categoryRepository: CategoryRepositoryInMemory;
  let categorias: Categoria[];
  beforeEach(() => {
    categoryRepository = new CategoryRepositoryInMemory();
    updateCategoryService = new UpdateCategory(categoryRepository);

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

  it('should be able to update a category', async () => {
    const category = await updateCategoryService.execute({
      categoryId: categorias[0].id,
      icon: 'icon-bebidas',
      name: 'bebidas',
    });

    expect(category.nome).toEqual('bebidas');
    expect(category.icon).toEqual('icon-bebidas');
  });
});

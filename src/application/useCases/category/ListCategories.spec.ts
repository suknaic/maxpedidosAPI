import { LancheRepositoryInMemory } from '@application/repositories/in-memory/lancheRepositoryInMemory';
import { ListCategories } from './ListCategories.service';
import { CategoryRepositoryInMemory } from '@application/repositories/in-memory/CategoryRepositoryInMemory';
import { makeLanche } from '@application/factories/lancheFactory';
import { Cardapio } from '@application/entities/Cardapio';
import { Categoria } from '@application/entities/Categoria';

describe('[CreateCategoryService]', () => {
  let listCategoryService: ListCategories;
  let categoryRepository: CategoryRepositoryInMemory;
  let lancheRepository: LancheRepositoryInMemory;
  beforeEach(() => {
    categoryRepository = new CategoryRepositoryInMemory();
    lancheRepository = new LancheRepositoryInMemory();
    listCategoryService = new ListCategories(
      categoryRepository,
      lancheRepository,
    );
    // cria o usuario
    // criar o lanche e o cardapio
    //add umas categoria
    const lanche = makeLanche({ usuarioId: 'mocked-user-id' });

    const cardapio = new Cardapio({
      lancheId: lanche.id,
    });
    lanche.cardapio = cardapio;

    const sanduiche = new Categoria({
      cardapioId: cardapio.id,
      nome: 'sanduiches',
    });
    const hamburguer = new Categoria({
      cardapioId: cardapio.id,
      nome: 'sanduiches',
    });
    categoryRepository.create(sanduiche);
    categoryRepository.create(hamburguer);

    cardapio.categorias = [sanduiche, hamburguer];

    lancheRepository.repository.push(lanche);
  });

  it('should be able to list all categories', async () => {
    const categorias = await listCategoryService.execute('mocked-user-id');

    expect(categorias).toBeInstanceOf(Array);
    expect(categorias).toHaveLength(2);
  });
});

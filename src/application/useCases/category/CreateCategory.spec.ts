import { CreateCategory } from './createCategory.service';
import { CategoryRepositoryInMemory } from '@application/repositories/in-memory/CategoryRepositoryInMemory';
import { HttpException } from '@nestjs/common';
import { Categoria } from '@application/entities/Categoria';
import { LancheRepositoryInMemory } from '@application/repositories/in-memory/lancheRepositoryInMemory';
import { makeLanche } from '@application/factories/lancheFactory';
import { Cardapio } from '@application/entities/Cardapio';

describe('[CreateCategoryService]', () => {
  let createCategoryService: CreateCategory;
  let categoryRepository: CategoryRepositoryInMemory;
  let lancheRepository: LancheRepositoryInMemory;
  let cardapioId: string;

  beforeEach(() => {
    lancheRepository = new LancheRepositoryInMemory();
    categoryRepository = new CategoryRepositoryInMemory();

    createCategoryService = new CreateCategory(
      categoryRepository,
      lancheRepository,
    );

    const lanche = makeLanche({ usuarioId: 'mocked-user-id' });
    lancheRepository.repository.push(lanche);
    const cardapio = new Cardapio({
      lancheId: lanche.id,
    });
    lanche.cardapio = cardapio;
    cardapioId = cardapio.id;
  });

  it('should be able to create a new category', async () => {
    try {
      await createCategoryService.execute({
        categoryName: 'sanduíches',
        categoryIcon: 'icon-san',
        userId: 'mocked-user-id',
      });
      expect(true).toBe(true);
    } catch (error) {
      fail(error);
    }
    expect(categoryRepository.repository).toHaveLength(1);
  });

  it('should not be able to create a new category with userId valid', () => {
    expect(async () => {
      await createCategoryService.execute({
        userId: 'invalid-id',
        categoryIcon: 'icon-san',
        categoryName: 'sanduíches',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });

  it('should not be able to create a new category with some name', () => {
    categoryRepository.repository.push(
      new Categoria({
        nome: 'sanduíches',
        icon: 'icon-san',
        cardapioId,
      }),
    );
    expect(async () => {
      await createCategoryService.execute({
        categoryName: 'sanduíches',
        categoryIcon: 'icon-san',
        userId: 'mocked-user-id',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
});

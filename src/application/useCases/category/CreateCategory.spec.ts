import { CardapioRepositoryInMemory } from '@application/repositories/in-memory/cardapioRepositoryInMemory';
import { CreateCategory } from './createCategory.service';
import { CategoryRepositoryInMemory } from '@application/repositories/in-memory/CategoryRepositoryInMemory';
import { Cardapio } from '@application/entities/Cardapio';
import { HttpException } from '@nestjs/common';
import { Categoria } from '@application/entities/Categoria';

describe('[CreateCategoryService]', () => {
  let createCategoryService: CreateCategory;
  let cardapioRepository: CardapioRepositoryInMemory;
  let categoryRepository: CategoryRepositoryInMemory;
  let cardapioId: string;

  beforeEach(() => {
    cardapioRepository = new CardapioRepositoryInMemory();
    categoryRepository = new CategoryRepositoryInMemory();

    createCategoryService = new CreateCategory(
      categoryRepository,
      cardapioRepository,
    );

    const cardapio = new Cardapio({
      lancheId: 'fake-lanche-id',
    });

    cardapioId = cardapio.id;

    cardapioRepository.create(cardapio);
  });

  it('should be able to create a new category', async () => {
    try {
      await createCategoryService.execute({
        cardapioId,
        categoryName: 'sanduíches',
      });
      expect(true).toBe(true);
    } catch (error) {
      fail(error);
    }
    expect(categoryRepository.repository).toHaveLength(1);
  });

  it('should not be able to create a new category without cardapioId valid', () => {
    expect(async () => {
      await createCategoryService.execute({
        cardapioId: 'invalid-id',
        categoryName: 'sanduíches',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });

  it('should not be able to create a new category with some name', () => {
    categoryRepository.repository.push(
      new Categoria({
        cardapioId,
        name: 'sanduíches',
      }),
    );
    expect(async () => {
      await createCategoryService.execute({
        cardapioId,
        categoryName: 'sanduíches',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
});

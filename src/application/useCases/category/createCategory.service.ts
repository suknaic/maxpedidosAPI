import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Categoria } from '@application/entities/Categoria';
import { CategoryRepository } from '@application/repositories/CategoryRepository';
import { LancheRepository } from '@application/repositories/lancheRepository';

type CategoryRequest = {
  categoryName: string;
  categoryIcon: string;
  userId: string;
};

@Injectable()
export class CreateCategory {
  constructor(
    private categoryRepository: CategoryRepository,
    private lancheRepository: LancheRepository,
  ) {}

  async execute({
    categoryName,
    categoryIcon,
    userId,
  }: CategoryRequest): Promise<void> {
    const lanche = await this.lancheRepository.findCardapioOfLancheByUserId(
      userId,
    );

    if (!lanche?.cardapio) {
      throw new HttpException(
        'Cardapio Nao Encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const cardapioId = lanche.cardapio.id;

    const categoryExists = await this.categoryRepository.findByName({
      cardapioId,
      categoryName,
    });

    if (categoryExists) {
      throw new HttpException(
        'O nome da Categoria já existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = new Categoria({
      nome: categoryName,
      icon: categoryIcon,
      cardapioId,
    });

    await this.categoryRepository.create(category);
  }
}

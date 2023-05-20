import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Categoria } from '@application/entities/Categoria';
import { CategoryRepository } from '@application/repositories/CategoryRepository';
import { LancheRepository } from '@application/repositories/lancheRepository';

type CategoryRequest = {
  categoryName: string;
  userId: string;
};

@Injectable()
export class CreateCategory {
  constructor(
    private categoryRepository: CategoryRepository,
    private lancheRepository: LancheRepository,
  ) {}

  async execute({ categoryName, userId }: CategoryRequest): Promise<void> {
    const lanche = await this.lancheRepository.findCardapioOfLancheByUserId(
      userId,
    );

    if (!lanche?.cardapio) {
      throw new HttpException(
        'Cardapio Nao Encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryExists = await this.categoryRepository.findByName({
      cardapioId: lanche?.cardapio.id,
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
      cardapioId: lanche?.cardapio.id,
    });

    await this.categoryRepository.create(category);
  }
}

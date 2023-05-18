import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Categoria } from '@application/entities/Categoria';
import { CategoryRepository } from '@application/repositories/CategoryRepository';
import { CardapioRepository } from '@application/repositories/CardapioRepository';

type CategoryRequest = {
  categoryName: string;
  cardapioId: string;
};

@Injectable()
export class CreateCategory {
  constructor(
    private categoryRepository: CategoryRepository,
    private cardapioRepository: CardapioRepository,
  ) {}

  async execute({ categoryName, cardapioId }: CategoryRequest): Promise<void> {
    const cardapioExists = await this.cardapioRepository.findById(cardapioId);

    if (!cardapioExists) {
      throw new HttpException(
        'Cardapio Nao Encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryExists = await this.categoryRepository.findByName(
      categoryName,
    );

    if (categoryExists) {
      throw new HttpException(
        'O nome da Categoria já existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = new Categoria({
      name: categoryName,
      cardapioId,
    });

    await this.categoryRepository.create(category);
  }
}

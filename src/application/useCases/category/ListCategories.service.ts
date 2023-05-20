import { CategoryRepository } from '@application/repositories/CategoryRepository';
import { LancheRepository } from '@application/repositories/lancheRepository';
import { Injectable } from '@nestjs/common';
import { Categoria } from '@prisma/client';

@Injectable()
export class ListCategories {
  constructor(
    private categoryRepository: CategoryRepository,
    private lancheRepository: LancheRepository,
  ) {}

  async execute(userId: string): Promise<Categoria[]> {
    const lanche = await this.lancheRepository.findCardapioOfLancheByUserId(
      userId,
    );
    const categorias = await this.categoryRepository.getAllByUser(
      lanche.cardapio.id,
    );
    return categorias;
  }
}

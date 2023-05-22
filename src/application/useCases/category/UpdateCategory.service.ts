import { CategoryRepository } from '@application/repositories/CategoryRepository';
import { Injectable } from '@nestjs/common';
import { Categoria } from '@prisma/client';

type UpdateCategoryRequest = {
  name: string;
  icon: string;
  categoryId: string;
};

@Injectable()
export class UpdateCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    categoryId,
    icon,
    name,
  }: UpdateCategoryRequest): Promise<Categoria> {
    const categoria = await this.categoryRepository.updateCategory({
      categoryId,
      categoryIcon: icon,
      categoryName: name,
    });

    return categoria;
  }
}

import { Injectable } from '@nestjs/common';
import {
  CategoryRepository,
  updateCategoryProps,
} from '@application/repositories/CategoryRepository';
import { Categoria } from '@application/entities/Categoria';
import { PrismaService } from '../prisma.service';
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prismaService: PrismaService) {}
  async updateCategory({
    categoryId,
    categoryIcon,
    categoryName,
  }: updateCategoryProps): Promise<Categoria> {
    const category = await this.prismaService.categoria.update({
      where: { id: categoryId },
      data: {
        nome: categoryName,
        icon: categoryIcon,
      },
    });

    return category as Categoria;
  }
  async getAllByUser(cardapioId: string): Promise<Categoria[]> {
    const categories = await this.prismaService.categoria.findMany({
      where: { cardapioId },
      select: {
        nome: true,
        icon: true,
        id: true,
      },
    });

    return categories as Categoria[];
  }

  async create(category: Categoria): Promise<void> {
    const raw = PrismaCategoryMapper.toPrisma(category);
    await this.prismaService.categoria.create({
      data: raw,
    });
  }
  async findByName({ categoryName, cardapioId }): Promise<Categoria> {
    const category = await this.prismaService.categoria.findFirst({
      where: { nome: categoryName, cardapioId },
    });

    return category as Categoria;
  }
}

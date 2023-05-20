import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@application/repositories/CategoryRepository';
import { Categoria } from '@application/entities/Categoria';
import { PrismaService } from '../prisma.service';
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prismaService: PrismaService) {}
  async getAllByUser(cardapioId: string): Promise<Categoria[]> {
    const categories = await this.prismaService.categoria.findMany({
      where: { cardapioId },
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

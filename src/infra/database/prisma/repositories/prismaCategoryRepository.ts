import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@application/repositories/CategoryRepository';
import { Categoria } from '@application/entities/Categoria';
import { PrismaService } from '../prisma.service';
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper';
@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  async create(category: Categoria): Promise<void> {
    const raw = PrismaCategoryMapper.toPrisma(category);
    await this.prismaService.categoria.create({
      data: raw,
    });
  }
  async findByName(categoryName: string): Promise<Categoria> {
    const category = await this.prismaService.categoria.findFirst({
      where: { nome: categoryName },
    });

    return category as Categoria;
  }
}

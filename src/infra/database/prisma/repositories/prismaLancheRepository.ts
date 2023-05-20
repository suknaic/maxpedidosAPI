import { Injectable } from '@nestjs/common';
import { Lanche } from 'src/application/entities/Lanche';
import { LancheRepository } from 'src/application/repositories/lancheRepository';
import { PrismaLancheMapper } from '../mappers/prisma-lanche-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaLancheRepository implements LancheRepository {
  constructor(private prismaService: PrismaService) {}

  async findLancheByUserId(userId: string): Promise<Lanche> {
    const lanche = await this.prismaService.lanche.findFirst({
      where: { usuarioId: userId },
    });

    return lanche as Lanche;
  }

  async findCardapioOfLancheByUserId(userId: string): Promise<Lanche> {
    const lanche = await this.prismaService.lanche.findFirst({
      where: { usuarioId: userId },
      select: {
        cardapio: {
          select: {
            id: true,
          },
        },
      },
    });

    return lanche as Lanche;
  }

  async create(lanche: Lanche): Promise<void> {
    const raw = PrismaLancheMapper.toPrisma(lanche);
    await this.prismaService.lanche.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Lanche> {
    const lanche = await this.prismaService.lanche.findFirst({
      where: { id },
    });

    return lanche as Lanche;
  }
}

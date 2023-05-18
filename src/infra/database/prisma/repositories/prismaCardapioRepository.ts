import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CardapioRepository } from 'src/application/repositories/CardapioRepository';
import { Cardapio } from 'src/application/entities/Cardapio';
import { PrismaCardapioMapper } from '../mappers/prisma-cardapio-mapper';

@Injectable()
export class PrismaCardapioRepository implements CardapioRepository {
  constructor(private prismaService: PrismaService) {}
  async findById(cardapioID: string): Promise<Cardapio> {
    const cardapio = await this.prismaService.cardapio.findFirst({
      where: { id: cardapioID },
    });

    return cardapio as Cardapio;
  }
  async create(cardapio: Cardapio): Promise<void> {
    const { id, lancheId } = PrismaCardapioMapper.toPrisma(cardapio);
    await this.prismaService.cardapio.create({
      data: {
        id,
        lancheId,
      },
    });
  }
}

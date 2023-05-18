import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EnderecoRepository } from '@application/repositories/enderecoRepository';
import { Endereco } from '@application/entities/Endereco';
import { PrismaEndercoMapper } from '../mappers/prisma-endereco-mapper';

@Injectable()
export class PrismaEnderecoRepository implements EnderecoRepository {
  constructor(private prismaService: PrismaService) {}
  async create(endereco: Endereco): Promise<void> {
    const raw = PrismaEndercoMapper.toPrisma(endereco);
    await this.prismaService.endereco.create({
      data: raw,
    });
  }
}

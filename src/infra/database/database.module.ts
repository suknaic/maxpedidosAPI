import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { UserRepository } from '@application/repositories/userRepository';
import { PrismaUserRepository } from './prisma/repositories/prismaUserRepository';

import { LancheRepository } from '@application/repositories/lancheRepository';
import { PrismaLancheRepository } from './prisma/repositories/prismaLancheRepository';

import { RefreshTokenRepository } from '@application/repositories/RefreshTokenRepository';
import { PrismaRefreshTokenRepository } from './prisma/repositories/prismaRefreshTokenRepository';

import { CardapioRepository } from '@application/repositories/CardapioRepository';
import { PrismaCardapioRepository } from './prisma/repositories/prismaCardapioRepository';

import { EnderecoRepository } from '@application/repositories/enderecoRepository';
import { PrismaEnderecoRepository } from './prisma/repositories/prismaEnderecoRepository';
import { CategoryRepository } from '@application/repositories/CategoryRepository';
import { PrismaCategoryRepository } from './prisma/repositories/prismaCategoryRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: RefreshTokenRepository,
      useClass: PrismaRefreshTokenRepository,
    },
    {
      provide: EnderecoRepository,
      useClass: PrismaEnderecoRepository,
    },
    {
      provide: LancheRepository,
      useClass: PrismaLancheRepository,
    },
    {
      provide: CardapioRepository,
      useClass: PrismaCardapioRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [
    UserRepository,
    RefreshTokenRepository,
    EnderecoRepository,
    LancheRepository,
    CardapioRepository,
    CategoryRepository,
  ],
})
export class databaseModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { UserRepository } from '../../application/repositories/userRepository';
import { PrismaUserRepository } from './prisma/repositories/prismaUserRepository';

import { LancheRepository } from '../../application/repositories/lancheRepository';
import { PrismaLancheRepository } from './prisma/repositories/prismaLancheRepository';
import { RefreshTokenRepository } from 'src/application/repositories/RefreshTokenRepository';
import { PrismaRefreshTokenRepository } from './prisma/repositories/prismaRefreshTokenRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: LancheRepository,
      useClass: PrismaLancheRepository,
    },
    {
      provide: RefreshTokenRepository,
      useClass: PrismaRefreshTokenRepository,
    },
  ],
  exports: [UserRepository, LancheRepository, RefreshTokenRepository],
})
export class databaseModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { UserRepository } from '../../application/repositories/userRepository';
import { PrismaUserRepository } from './prisma/repositories/prismaUserRepository';

import { LancheRepository } from '../../application/repositories/lancheRepository';
import { PrismaLancheRepository } from './prisma/repositories/prismaLancheRepository';

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
  ],
  exports: [UserRepository, LancheRepository],
})
export class databaseModule {}

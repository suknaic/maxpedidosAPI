import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { UserRepository } from '../../application/repositories/userRepository';
import { prismaUserRepository } from './prisma/repositories/prismaUserRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: prismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class databaseModule {}

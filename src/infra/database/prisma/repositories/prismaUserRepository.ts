import { Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/User';
import { UserRepository } from 'src/application/repositories/userRepository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(user);
    const userCreated = await this.prismaService.usuario.upsert({
      where: { email: raw.email },
      update: raw,
      create: raw,
    });

    return userCreated as User;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.usuario.findFirst({
      where: { email },
    });
    return user as User;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.usuario.findFirst({
      where: { id },
    });

    return user as User;
  }
}

import { Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/User';
import { UserRepository } from 'src/application/repositories/userRepository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class prismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);
    await this.prismaService.usuario.create({
      data: raw,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.usuario.findUnique({
      where: { email },
    });
    const usuario = new User(user);
    return usuario;
  }
}

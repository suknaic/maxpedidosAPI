import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IRefreshTokenRequest,
  RefreshToken,
  RefreshTokenRepository,
} from 'src/application/repositories/RefreshTokenRepository';

@Injectable()
export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private prismaService: PrismaService) {}
  async deleteManyByUserId(id: string): Promise<void> {
    await this.prismaService.refreshToken.deleteMany({
      where: { usuarioId: id },
    });
  }

  async findUserIdAndRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<RefreshToken> {
    const refresh_token = await this.prismaService.refreshToken.findFirst({
      where: { usuarioId: id, refreshToken },
    });

    return refresh_token;
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.refreshToken.delete({
      where: { id },
    });
  }

  async create({
    usuarioId,
    refreshToken,
    expiresIn,
  }: IRefreshTokenRequest): Promise<RefreshToken> {
    const token = await this.prismaService.refreshToken.create({
      data: {
        usuarioId,
        refreshToken,
        expiresIn,
      },
    });

    return token;
  }
}

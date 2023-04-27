import { randomUUID } from 'crypto';
import {
  RefreshToken,
  RefreshTokenRepository,
  IRefreshTokenRequest,
} from '../RefreshTokenRepository';

export class RefreshTokenRepositoryInMemory implements RefreshTokenRepository {
  public repository: RefreshToken[];
  constructor() {
    this.repository = [];
  }

  async create({
    usuarioId,
    refreshToken,
    expiresIn,
  }: IRefreshTokenRequest): Promise<RefreshToken> {
    const token: RefreshToken = {} as RefreshToken;

    Object.assign(token, {
      id: randomUUID(),
      usuarioId,
      refreshToken,
      expiresIn,
    });

    this.repository.push(token);

    return token;
  }

  async findUserIdAndRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<RefreshToken> {
    const userRefreshToken = await this.repository.find(
      (refresh) =>
        refresh.usuarioId === id && refresh.refreshToken === refreshToken,
    );

    return userRefreshToken;
  }

  async deleteByUserId(id: string): Promise<void> {
    this.repository = this.repository.filter(
      (refresh) => refresh.usuarioId !== id,
    );
  }
  async deleteById(id: string): Promise<void> {
    const indexToDelete = this.repository.findIndex(
      (refresh) => refresh.id === id,
    );

    if (indexToDelete !== -1) {
      this.repository.slice(indexToDelete, 1);
    }
  }
}

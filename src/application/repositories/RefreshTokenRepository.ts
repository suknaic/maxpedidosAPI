export interface IRefreshTokenRequest {
  usuarioId: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshToken {
  id: string;
  refreshToken: string;
  expiresIn: number;
  usuarioId: string;
}

export abstract class RefreshTokenRepository {
  abstract create({
    usuarioId,
    refreshToken,
    expiresIn,
  }: IRefreshTokenRequest): Promise<RefreshToken>;
  abstract findUserIdAndRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<RefreshToken>;

  abstract findByRefreshToken(token: string): Promise<RefreshToken>;

  abstract deleteById(id: string): Promise<void>;
  abstract deleteManyByUserId(id: string): Promise<void>;
}

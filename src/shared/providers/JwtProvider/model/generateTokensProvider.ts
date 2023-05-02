type generateRefreshTokenRequest = {
  usuarioId: string;
  email: string;
};

type generateRefreshTokenResponse = {
  usuarioId: string;
  refreshToken: string;
  expiresIn: number;
};

type verifyRefreshTokenResponse = {
  sub: string;
  email: string;
};

export abstract class ITokensProvider {
  abstract generateToken(usuarioId: string): Promise<string>;
  abstract generateRefreshToken({
    usuarioId,
    email,
  }: generateRefreshTokenRequest): Promise<generateRefreshTokenResponse>;

  abstract verifyToken(token: string): Promise<string>;
  abstract verifyRefreshToken(
    refreshtoken: string,
  ): Promise<verifyRefreshTokenResponse>;
}

export const jwtConstants = {
  secret_token: process.env.SECRET_TOKEN,
  secret_refreshtoken: process.env.SECRET_REFRESH_TOKEN,
  expires_in_token: '20s',
  expires_in_refreshToken: '3d',
  expires_refreshToken_day: 3,
};

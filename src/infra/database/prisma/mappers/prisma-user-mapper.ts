import { Usuario } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: Usuario) {
    return {
      nome: user.nome,
      contato: user.contato,
      email: user.email,
      senha: user.senha,
    };
  }
}

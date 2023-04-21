import { User } from 'src/application/entities/User';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      nome: user.nome,
      contato: user.contato,
      email: user.email,
      senha: user.senha,
    };
  }
}

import { User } from 'src/application/entities/User';

export class UserMapperView {
  static toHTTP(user: User) {
    return {
      nome: user.nome,
      contato: user.contato,
      email: user.email,
      lanches: user.lanches,
    };
  }
}

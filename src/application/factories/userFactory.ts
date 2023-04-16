import { User, UserProps } from '../entities/User';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    nome: 'joao',
    contato: '99999999999',
    email: 'joao@email.com',
    senha: '12345',
    ...override,
  });
}

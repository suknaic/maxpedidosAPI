import { User } from './User';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      nome: 'felipe',
      contato: '6899258-1641',
      email: 'suknaic@email.com',
      senha: '12345',
    });

    expect(user).toBeTruthy();
    expect(user).toHaveProperty('_id');
  });
});

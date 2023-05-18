import { HttpException } from '@nestjs/common';
import { UserRepositoryInMemory } from '@application/repositories/in-memory/userRepositoryInMemory';
import { CreateUserService } from './createUser.service';

describe('[CreateUserService]', () => {
  let userRepositoryInMemory: UserRepositoryInMemory;
  let createUserService: CreateUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const { user } = await createUserService.execute({
      nome: 'user-mock',
      contato: '6899258-1641',
      email: 'test@email.com',
      senha: '12345',
    });

    expect(userRepositoryInMemory.repository).toHaveLength(1);
    expect(userRepositoryInMemory.repository[0]).toEqual(user);
  });

  it('should not be able to create a new user with user Existents', async () => {
    await createUserService.execute({
      nome: 'user-mock',
      contato: '6899258-1641',
      email: 'test@email.com',
      senha: '12345',
    });

    expect(async () => {
      await createUserService.execute({
        nome: 'user-existing',
        contato: '6899258-1641',
        email: 'test@email.com',
        senha: '12345',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
});

import { UserInMemoryRepository } from '../../repositories/in-memory/userRepositoryInMemory';
import { CreateUserService } from './createUser.service';

describe('[CreateUserService]', () => {
  let userRepositoryInMemory: UserInMemoryRepository;
  let createUserService: CreateUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserInMemoryRepository();
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const { user } = await createUserService.execute({
      nome: 'felipe suknaic',
      contato: '6899258-1641',
      email: 'suknaic@email.com',
      senha: '12345',
    });
    console.log(user);

    expect(userRepositoryInMemory.repository).toHaveLength(1);
    expect(userRepositoryInMemory.repository[0]).toEqual(user);
  });
});

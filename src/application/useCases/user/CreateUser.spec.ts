import { UserInMemoryRepository } from '../../repositories/in-memory/user-in-memory-repository';
import { CreateUserService } from './CreateUser.service';

describe('[CreateUserService]', () => {
  let fakeUserRepository: UserInMemoryRepository;
  let createUserService: CreateUserService;

  beforeEach(() => {
    fakeUserRepository = new UserInMemoryRepository();
    createUserService = new CreateUserService(fakeUserRepository);
  });

  it('should be able to create a new user', async () => {
    const { usuario } = await createUserService.execute({
      nome: 'felipe suknaic',
      contato: '6899258-1641',
      email: 'suknaic@email.com',
      senha: '12345',
    });
    console.log(usuario);

    expect(fakeUserRepository.repository).toHaveLength(1);
    expect(fakeUserRepository.repository[0]).toEqual(usuario);
  });
});

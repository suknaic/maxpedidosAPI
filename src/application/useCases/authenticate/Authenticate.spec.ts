import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/User';
import { UserRepositoryInMemory } from '../../repositories/in-memory/userRepositoryInMemory';
import { AuthenticateService } from './authenticate.service';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';

describe('[AuthenticateService]', () => {
  let userInMemoryRepository: UserRepositoryInMemory;
  let authenticateService: AuthenticateService;
  let jwtService: JwtService;

  beforeEach(async () => {
    userInMemoryRepository = new UserRepositoryInMemory();
    jwtService = {
      signAsync: jest.fn(async () => 'mockedToken'),
    } as unknown as JwtService;
    authenticateService = new AuthenticateService(
      userInMemoryRepository,
      jwtService,
    );

    const passwordHash = await bcrypt.hash('12345', 8);
    const userFake = new User({
      contato: '0000000000',
      email: 'email@test.com',
      nome: 'fake_user',
      senha: passwordHash,
    });

    userInMemoryRepository.create(userFake);
  });

  afterEach(() => {
    // bcryptCompareSpy.mockRestore();
  });

  it('should verify if password match', async () => {
    const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare');
    await authenticateService.execute({
      email: 'email@test.com',
      password: '12345',
    });
    expect(bcryptCompareSpy).toHaveBeenCalled();
  });

  it('should return a valid JWT Token', async () => {
    // bcryptCompareSpy.mockResolvedValue(true);
    const { token } = await authenticateService.execute({
      email: 'email@test.com',
      password: '12345',
    });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: userInMemoryRepository.repository[0].id,
      username: userInMemoryRepository.repository[0].nome,
    });
    expect(token).toBe('mockedToken');
    expect(typeof token).toEqual('string');
  });

  it('should not be authenticate a user nonexistent', async () => {
    expect(async () => {
      await authenticateService.execute({
        email: 'FailEmail@test.com',
        password: '12345',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
  it('should not be authenticate a user with password incorrect', async () => {
    expect(async () => {
      await authenticateService.execute({
        email: 'email@test.com',
        password: 'invalid-password',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
});

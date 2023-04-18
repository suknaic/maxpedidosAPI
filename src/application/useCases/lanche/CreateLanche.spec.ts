import { UserRepositoryInMemory } from '../../repositories/in-memory/userRepositoryInMemory';
import { LancheRepositoryInMemory } from '../../repositories/in-memory/lancheRepositoryInMemory';

import { CreateLancheService } from './createLanche.service';
import { makeUser } from '../../factories/userFactory';
import { HttpException } from '@nestjs/common';

describe('[CreateLancheService]', () => {
  let useRepositoryInMemory: UserRepositoryInMemory;
  let lancheRepository: LancheRepositoryInMemory;
  let createLancheService: CreateLancheService;

  beforeEach(() => {
    lancheRepository = new LancheRepositoryInMemory();
    useRepositoryInMemory = new UserRepositoryInMemory();
    createLancheService = new CreateLancheService(
      lancheRepository,
      useRepositoryInMemory,
    );
    const fakeUser = makeUser();

    useRepositoryInMemory.create(fakeUser);
  });

  it('should be able to create a new lanche', async () => {
    const fakeUser = await useRepositoryInMemory.findByEmail('joao@email.com');

    const { lanche } = await createLancheService.execute({
      logo: 'logodojoao.jpeg',
      nome: 'lanche do joao',
      contato: '99999999999',
      usuarioId: fakeUser.id,
    });
    expect(lancheRepository.repository).toHaveLength(1);
    expect(lancheRepository.repository[0]).toEqual(lanche);
  });

  it('should not able to create a new lanche with userId invalid', async () => {
    expect(async () => {
      await createLancheService.execute({
        logo: 'logodojoao.jpeg',
        nome: 'lanche do joao',
        contato: '99999999999',
        usuarioId: 'invalidId',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
});

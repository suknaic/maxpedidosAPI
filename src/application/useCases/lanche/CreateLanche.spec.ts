import { UserRepositoryInMemory } from '../../repositories/in-memory/userRepositoryInMemory';
import { LancheRepositoryInMemory } from '../../repositories/in-memory/lancheRepositoryInMemory';

import { CreateLancheService } from './createLanche.service';
import { makeUser } from '../../factories/userFactory';
import { HttpException } from '@nestjs/common';
import { DateProviderMock } from '@shared/providers/DateProvider/mock/DayjsDateProvider.mock';

describe('[CreateLancheService]', () => {
  let useRepositoryInMemory: UserRepositoryInMemory;
  let lancheRepository: LancheRepositoryInMemory;
  let createLancheService: CreateLancheService;
  let dateProvider: DateProviderMock;

  beforeEach(() => {
    useRepositoryInMemory = new UserRepositoryInMemory();

    lancheRepository = new LancheRepositoryInMemory();
    dateProvider = new DateProviderMock();
    createLancheService = new CreateLancheService(
      lancheRepository,
      useRepositoryInMemory,
      dateProvider,
    );
    const fakeUser = makeUser();

    useRepositoryInMemory.create(fakeUser);
  });

  it('should be able to create a new lanche', async () => {
    const fakeUser = await useRepositoryInMemory.findByEmail('joao@email.com');

    await createLancheService.execute({
      logo: 'logodojoao.jpeg',
      nome: 'lanche do joao',
      contato: '99999999999',
      horaAbre: '18:30',
      horaFecha: '23:00',
      diasAbre: ['segunda-feira', 'terça-feira'],
      usuarioId: fakeUser.id,
    });
    expect(lancheRepository.repository).toHaveLength(1);
    expect(lancheRepository.repository[0]).toHaveProperty('id');
  });

  it('should not able to create a new lanche with userId invalid', async () => {
    expect(async () => {
      await createLancheService.execute({
        logo: 'logodojoao.jpeg',
        nome: 'lanche do joao',
        contato: '99999999999',
        horaAbre: '18:30',
        horaFecha: '23:00',
        diasAbre: ['segunda-feira', 'terça-feira'],
        usuarioId: 'invalidId',
      });
    }).rejects.toBeInstanceOf(HttpException);
  });
});

import { LancheRepositoryInMemory } from '@application/repositories/in-memory/lancheRepositoryInMemory';
import { CreateCardapioService } from './createCardapio.service';
import { CardapioRepositoryInMemory } from '@application/repositories/in-memory/cardapioRepositoryInMemory';
import { makeLanche } from '@application/factories/lancheFactory';
import { HttpException } from '@nestjs/common';

describe('[CreateCardapioService]', () => {
  let cardapioRepository: CardapioRepositoryInMemory;
  let lancheRepository: LancheRepositoryInMemory;

  let createCardapioService: CreateCardapioService;

  beforeEach(() => {
    cardapioRepository = new CardapioRepositoryInMemory();
    lancheRepository = new LancheRepositoryInMemory();

    createCardapioService = new CreateCardapioService(
      cardapioRepository,
      lancheRepository,
    );
  });

  it('shoud be able to create a new cardapio', async () => {
    const fakeLanche = makeLanche();
    lancheRepository.repository.push(fakeLanche);
    await createCardapioService.execute(fakeLanche.id);

    expect(cardapioRepository.repository).toHaveLength(1);
  });

  it('should not be able to create a new cardapio without lancheID valid', () => {
    expect(async () => {
      await createCardapioService.execute('invalid-lancheId');
    }).rejects.toBeInstanceOf(HttpException);
  });
});
